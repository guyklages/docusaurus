# SDK for developers

## Overview

I wrote the following SDKs for fintech developers:

| Title | <div style={{ width: '120px' }}>Code samples</div> | Company |
|-------|----------------------------------------------------|---------|
| **[External accounts SDK](../atelio/accounts/external-accounts-sdk.md)** <br/> **[SDK classes](../atelio/accounts/sdk-documentation.md)** <br/> **[Atelio cards SDK](../atelio/cards/ateliocards-sdk.md)** <br/> **[SDK for web documentation](https://guyklages.com/atelio/developers/web-sdk-documentation)** | cURL, HTML, JavaScript <br/> <br/> cURL, C#, Java, JavaScript, Python, Ruby <br/> <br/>| Atelio / FIS <br/> <sup> _San Francisco, CA_ </sup> |
| **[Android SDK for payments](#android-sdk-for-payments)** <br/> **[iOS SDK for Apple Pay payments](#ios-sdk-for-apple-pay)**   | Java <br/> Objective-C, Swift | ROAM Data <br/> <sup> _Boston, MA_ </sup> |

## Android SDK for payments

_(This guide describes the Stripe-based integration we built at ROAM Data in 2016)_

This documentation provides knowledge in developing Stripe mobile payment inside any Android app.

Stripe has created a Java library for Android, allowing you to easily submit payments from an Android app. Our library eliminates the need to send card data directly to your server. Instead, it sends the card data directly to our servers, where we can convert them to tokens.

Your app will receive the token back, and will then be able to send the token to an endpoint on your server, where it can be used to process a payment, establish recurring billing, or merely saved for later use.

Stripe supports Android back to version 4 (Ice Cream Sandwich), and the library has no external dependencies.

### Installation

There is a difference in installing the Stripe Android library depending on whether you use Android Studio or Eclipse.

#### Android Studio

Add the following code to your app's build.gradle file, inside the dependencies section:

```java
compile 'com.stripe:stripe-android:+'
```

#### Eclipse

1. Download the stripe-android libraries.
2. Be sure you have installed the Android SDK with a minimum of API Level 17 and android-support-v4.
3. Import the stripe folder into Eclipse.
4. In your project settings, add the 'stripe' project under the "Libraries" section of the "Android" category.

### Collecting Credit Card Information

At some point in the flow of your app, you will want to obtain payment details from the user. There are 2 ways to do this:

- Use Android Pay to access your customer's stored card information
- Build your own credit card form

We recommend you to write your app to offer support for both.

#### Using Android Pay

Through Android Pay, you can access payment information stored in your customer's Google accounts. Following are the instructions to integrate your app with Android Pay.

> **Note:** When this documentation was released, Android Pay was still in Beta Version.

##### Setting Up Your App

First, you will need to obtain credentials and a client ID for your app, as explained in the Android Pay API Tutorial. You will also need to set up the latest version of Google Play services.

##### Collecting Payment Information Through Android Pay

To use Android Pay in your app, first enable the Android Pay API by adding the following code to the `<application>` tag of your AndroidManifest.xml:

```java
<application>
...
<meta-data
android:name="com.google.android.gms.wallet.api.enabled"
android:value="true" />
</application>
```

In the activity's layout, your application will also need a SupportWalletFragment (the placeholder for the Android Pay purchase button). To create this, add the following code to your program:

```java
<!-- You will need to add the wallet namespace to your enclosing Layout -->
xmlns:wallet="http://schemas.android.com/apk/res-auto"
<fragment
android:id="@+id/wallet_fragment"
android:name="com.google.android.gms.wallet.fragment.SupportWalletFragment"
android:layout_width="match_parent"
android:layout_height="wrap_content"
wallet:environment="test"
wallet:fragmentMode="buyButton"/>
```

After placing the fragment, you need to:

1. Grab a reference to that fragment
2. Create a MaskWalletRequest
3. Initialize the fragment

In the MaskWalletRequest, you are able to specify the amount to charge and what additional information you would like to collect (e.g., the shipping address). This is also where you can specify that you are using Stripe as the processor. Doing so will allow the application to request a Stripe token directly from the wallet.

Before starting the Android Pay flow, use the isReadyToPay() method to check whether the user has the Android Pay app installed and is ready to pay through it. Make sure you have already mastered Google's documentation for information on their UI and branding requirements.

The following code is the Android Pay flow:

```java
public class PaymentActivity extends FragmentActivity implements GoogleApiClient.ConnectionCallbacks,
GoogleApiClient.OnConnectionFailedListener {

// You will need to use your live API key even while testing
public static final String PUBLISHABLE_KEY = "pk_live_XXX";

// Unique identifiers for asynchronous requests:
private static final int LOAD_MASKED_WALLET_REQUEST_CODE = 1000;
private static final int LOAD_FULL_WALLET_REQUEST_CODE = 1001;
private SupportWalletFragment walletFragment;

public void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  Wallet.Payments.isReadyToPay(googleApiClient).setResultCallback(
    new ResultCallback<BooleanResult>() {
      @Override
      public void onResult(@NonNull BooleanResult booleanResult) {
        if (booleanResult.getStatus().isSuccess()) {
          if (booleanResult.getValue()) {
            showAndroidPay();
          } else {
            // Hide Android Pay buttons, show a message that Android Pay
            // cannot be used yet, and display a traditional checkout button
          }
        } else {
          // Error making isReadyToPay call
          Log.e(TAG, "isReadyToPay:" + booleanResult.getStatus());
        }
      }
    });
  ...
}

public void showAndroidPay() {
  setContentView(R.layout.payment_activity);
  walletFragment = (SupportWalletFragment) getSupportFragmentManager()
    .findFragmentById(R.id.wallet_fragment);

  MaskedWalletRequest maskedWalletRequest = MaskedWalletRequest.newBuilder()
    // Request credit card tokenization with Stripe:
    .setPaymentMethodTokenizationParameters(
      PaymentMethodTokenizationParameters.newBuilder()
        .setPayment MethodTokenizationType(PaymentMethodTokenizationType.PAYMENT_GATEWAY)
        .addParameter("gateway", "stripe")
        .addParameter("stripe:publishableKey", PUBLISHABLE_KEY)
        .addParameter("stripe:version", com.stripe.Stripe.VERSION)
        .build())
      .setShippingAddressRequired(true)
      .setEstimatedTotalPrice("20.00")
      .setCurrencyCode("USD")
      .build();

    WalletFragmentInitParams initParams = WalletFragmentInitParams.newBuilder()
      .setMaskedWalletRequest(maskedWalletRequest)
      .setMaskedWalletRequestCode(LOAD_MASKED_WALLET_REQUEST_CODE)
      .build();
    walletFragment.initialize(initParams);
    ...
  }

  public void onStart() { ... }
  public void onStop() { ... }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) { ... }
  @Override public void onConnectionFailed(ConnectionResult connectionResult) {}
  @Override public void onConnected(Bundle bundle) {}
  @Override public void onConnectionSuspended(int i) {}
}
```

> **Note:** The price set within the Android app is written as a decimal and is for the Android app only. The token received back will be sent to your server, and the charge request will be made of the Stripe API from there. The actual amount to be charged is requested at that point, and is set as an integer.

The last step of the Android Pay setup process for the app is to connect to the Google Wallet API. This connection handles the case when a user presses the Android Pay purchase button and the payment is processed. To do so, add the following code:

```java
public class PaymentActivity extends FragmentActivity {
  ...
  private GoogleApiClient googleApiClient;

  public void onCreate(Bundle savedInstanceState) {
    ...
    googleApiClient = new GoogleApiClient.Builder(this)
      .addConnectionCallbacks(this)
      .addOnConnectionFailedListener(this)
      .addApi(Wallet.API, new Wallet.WalletOptions.Builder()
        .setEnvironment(WalletConstants.ENVIRONMENT_TEST)
        .setTheme(WalletConstants.THEME_LIGHT)
        .build())
     .build();
  }

  public void onStart() {
    super.onStart();
    googleApiClient.connect();
  }

  public void onStop() {
    super.onStop();
    googleApiClient.disconnect();
  }
}
```

Once your customer confirms their purchase, the application then needs to create a FullWalletRequest. This will allow the application to request access to the customer's FullWallet, which is where the payment information comes from. To do this, implement onActivityResult:

```java
public class PaymentActivity extends FragmentActivity {
  ...
  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
  super.onActivityResult(requestCode, resultCode, data);
  if (requestCode == LOAD_MASKED_WALLET_REQUEST_CODE) {
    if (resultCode == Activity.RESULT_OK) {
        MaskedWallet maskedWallet = data.getParcelableExtra(WalletConstants.EXTRA_MASKED_WALLET);
        FullWalletRequest fullWalletRequest = FullWalletRequest.newBuilder()
          .setCart(Cart.newBuilder()
            .setCurrencyCode("USD")
            .setTotalPrice("20.00")
            .addLineItem(LineItem.newBuilder()
              .setCurrencyCode("USD")
              .setQuantity("1")
              .setDescription("Premium Llama Food")
              .setTotalPrice("20.00")
              .setUnitPrice("20.00")
              .build())
            .build())
          .setGoogleTransactionId(maskedWallet.getGoogleTransactionId())
          .build();
        Wallet.Payments.loadFullWallet(googleApiClient, fullWalletRequest, LOAD_FULL_WALLET_REQUEST_CODE);
      }
    } else if (requestCode == LOAD_FULL_WALLET_REQUEST_CODE) {
      ...
    }
  }
}
```

> **Note:** The above example has only one item, but if your customer is purchasing multiple items, you can add multiple items by calling addLineItem additional times.

##### Creating Tokens from Android Pay

Once your customer allows access to their wallet for payment, the application will be given back a Stripe token. You will then send this token to your server for use through the API.

```java
public class PaymentActivity extends FragmentActivity {
  ...
  // Keep track of your current environment.
  // Change to WalletConstants.ENVIRONMENT_PRODUCTION when ready to go live.
  public static final int mEnvironment = WalletConstants.ENVIRONMENT_TEST;

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == LOAD_MASKED_WALLET_REQUEST_CODE) {
      ...
    } else if (requestCode == LOAD_FULL_WALLET_REQUEST_CODE) {
      if (resultCode == Activity.RESULT_OK) {
        FullWallet fullWallet = data.getParcelableExtra(WalletConstants.EXTRA_FULL_WALLET);
        String tokenJSON = fullWallet.getPaymentMethodToken().getToken();
        // A token will only be returned in production mode,
        // i.e. WalletConstants.ENVIRONMENT_PRODUCTION
        if (mEnvironment == WalletConstants.ENVIRONMENT_PRODUCTION) {
          com.stripe.model.Token token = com.stripe.model.Token.GSON.fromJson(
            tokenJSON, com.stripe.model.Token.class);
          // TODO: send token to your server
        }
      }
    } else {
      super.onActivityResult(requestCode, resultCode, data);
    }
  }
}
```

##### Testing and Deploying with Android Pay

To test your Android Pay flow, use your live Stripe API key, not your test key, in conjunction with the Android Pay test environment, specified by WalletConstants.ENVIRONMENT_TEST.

In test mode, fullWallet.getPaymentMethodToken().getToken() will return the string "TEST_GATEWAY_TOKEN" in place of a JSON string representing a token.

If you want to test your application on a physical device, make sure the device supports NFC. You will also need to add a support credit card to your Android Pay account.

When you are ready, you can get production access to Android Pay by submitting your APK to Google for review.

#### Building Your Own Form

If you plan to build your own form, make sure you will at least be able to collect your customer's card numbers and expiration dates. We recommend you to also collect the CVC to prevent fraud. The user's name and billing address are optional and would benefit you in terms of fraud protection.

Once you have collected a customer's information, you will need to exchange the information for a Stripe token.

##### Creating and Validating Cards from a Customer Form

The first step is to import the Stripe classes before using them:

```java
import com.stripe.android.*;
```

There are two main classes: Card and Stripe. The Card class contains many useful helpers for validating card input on the client-side before a charge is created.

To construct a Card instance with your customer's payment information, add the following code to your program:

```java
Card card = new Card(
  cardNumber,
  cardExpMonth,
  cardExpYear,
  cardCVC
);
card.validateNumber();
card.validateCVC();
```

The Card instance contains helpers to validate that:

- the card number passes the Luhn check
- the expiration date is in the future
- the CVC looks valid

You will probably want to validate these three things at once, so we have included a validateCard function that does so:

```java
Card card = new Card("4242-4242-4242-4242", 12, 2017, "123");
if ( !card.validateCard() ) {
  // Show errors
}
```

##### Creating Tokens from a Customer Form

The next step is to pass off that sensitive payment information securely to Stripe, where you will exchange it for a token.

You can create tokens using the Stripe instance method createToken, passing in a Card instance and completion callbacks. An asynchronous network request will be executed, and the appropriate callback invoked when it completes.

```java
Card card = new Card("4242424242424242", 12, 2017, "123");
Stripe stripe = new Stripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

stripe.createToken(
  card,
  new TokenCallback() {
    public void onSuccess(Token token) {
      // Send token to your server
    }
    public void onError(Exception error) {
      // Show localized error message
      Toast.makeText(getContext(),
        error.getLocalizedString(getContext()),
        Toast.LENGTH_LONG
      ).show();
    }
  }
);
```

We have placed your test publishable API key as the first argument to Stripe. You will need to swap it out with your live publishable key in production. You can see all your keys after logging into your Stripe dashboard.

### Using Tokens

Using the payment token requires an API call from your server using your secret API key. For security purposes, you should never embed your secret API key in your app.

To do so, you need to set up an endpoint on your server that can receive an HTTP POST call for the token. In the onActivityResult method or the onSuccess callback, you will need to POST the supplied token to your server. Make sure any communication with your server is SSL secured to prevent eavesdropping.


## iOS SDK for Apple Pay

_(This guide describes the Stripe-based integration we built at ROAM Data in 2016)_

### Introduction

This document provides knowledge in building the iOS app that accepts payment in iOS devices, with built-in support for Apple Pay.

If you want to build a mobile app like [Lyft](https://www.lyft.com/) or [Fancy](https://www.fancy.com/) and enable people to make purchases directly in your app, our iOS libraries can help. The library also supports [Apple Pay](https://stripe.com/blog/apple-pay) so that your users can make frictionless payments without having to enter in their credit card info.

Accepting payments in your app involves 3 steps:

1. Collecting credit card information from your customer
2. Converting the credit card information to a single-use token
3. Sending this token to your server to create a charge

### Getting started

#### Step 1: Install the library

##### Using CocoaPods

We recommend using CocoaPods to install the [Stripe iOS library](https://github.com/stripe/stripe-ios) since it makes it easy to keep your app's dependencies up-to-date.

If you have not set up CocoaPods before, we recommend following the installation instructions on the [CocoaPods site](https://cocoapods.org/), then add pod 'Stripe' to your Podfile, and run pod install.

**Note**: Use the .xcworkspace file to open your project in Xcode instead of the .xcodeproj file.

##### Using Carthage

To use [Carthage](https://github.com/Carthage/Carthage), simply add github `stripe/stripe-ios` to your Cartfile and follow the [Carthage Installation instructions](https://github.com/Carthage/Carthage).

##### Using manual installation

We publish our SDK as a static framework that you can copy directly into your app without any additional tools. To manually install the library, do the following:

1. Head to our releases page and downloads the framework that is right for you.
2. Unzip the file you downloaded.
3. In Xcode, with your project open, click **File > Add files**.
4. Select Stripe.framework in the directory you just unzipped.
5. Make sure **Copy items if needed** is checked.
6. Click **Add**.
7. In your project settings, go to the **Build Settings** tab, and under **Other Linker Flags**, make sure -ObjC is present.

#### Step 2: Configure API keys

First, configure Stripe with your published API key. We recommend doing this in your AppDelegate's `application:didFinishLaunchingWithOptions` method so that it will be set for the entire lifecycle of your app.

**Example in Swift**

```swift
// AppDelegate.swift

import Stripe

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: \[NSObject: AnyObject\]?)
-> Bool {
        Stripe.setDefaultPublishableKey("pk_test_6pRNASCoBOKtIshFeQd4XMUh")
        return true
    }
}
```

**Example in Objective-C**

```objectivec
// AppDelegate.m

## import "AppDelegate.h"
## import <Stripe/Stripe.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication \*)application
didFinishLaunchingWithOptions:(NSDictionary \*)launchOptions
{
    [Stripe setDefaultPublishableKey:@"pk_test_6pRNASCoBOKtIshFeQd4XMUh"\];
    return YES;
}

@end
```

**Note**: We have placed your test publishable API key as the StripePublishableKey constant in the above snippet. You will need to swap it out with your live publishable key in production. You can see all your API keys in your dashboard.

### Collecting credit card info

There are three ways to obtain payment details from the user:

A. Use the Apple Pay framework to access your users' stored payment information.
B. Use our pre-built form component, STPPaymentCardTextField to collect new credit card details.
C. Build your own credit card form from scratch.

Since Apple Pay supports only certain credit cards on the latest iOS devices, we recommend using Apple Pay in combination with option 2 or option 3 as a fallback on devices where Apple Pay is not available.

#### Using Apple Pay

With Apple Pay, you are able to access payment information stored on your customer' iOS devices.

#### important note before starting

To use Apple Pay, you need to add the Apple Pay capability to your app in Xcode. This requires creating a merchant ID with Apple first, as explained in the "Getting Started with Apple Pay" documentation.

After setting up the merchant ID, you need to generate a PKPaymentRequest to submit to Apple. We have provided a convenient method to generate one with reasonable defaults. All you need to do is set the paymentSummaryItems property to an array of PKPaymentSummaryItems . These are analogous to line items on a receipt and are used to explain your charge to the user. For more details, see the [PKPaymentRequest documentation](https://developer.apple.com/documentation/passkit/pkpaymentrequest).

Now that you have created the request, the next step is to query the device to see if Apple Pay is available; that is, if your app is running on the latest hardware and the user has added a valid credit card. YOUR_APPLE_MERCHANT_ID is an identifier that you obtain directly from Apple. If Apple Pay is available, you should create and display the

payment request view controller. To do so, follow the below code:

**Example in Swift**

```swift
// ViewController.swift

guard let request = Stripe.paymentRequestWithMerchantIdentifier("YOUR_APPLE_MERCHANT_ID") else {
    // request will be nil if running on < iOS8
    return
}
request.paymentSummaryItems = \[
    PKPaymentSummaryItem(label: "Premium Llama Food", amount: 10.0)
]

if (Stripe.canSubmitPaymentRequest(request)) {
    let paymentController = PKPaymentAuthorizationViewController(paymentRequest: request)
    presentViewController(paymentController, animated: true, completion: nil)
} else {
    // Show the user your own credit card form (see options 2 or 3)

}
```

**Example in Objective-C**

```objectivec
// ViewController.m

PKPaymentRequest \*request = \[Stripe paymentRequestWithMerchantIdentifier:"YOUR_APPLE_MERCHANT_ID"\];
NSString \*label = @"Premium Llama Food";
NSDecimalNumber \*amount = \[NSDecimalNumber decimalNumberWithString:@"10.00"\];
request.paymentSummaryItems = @\[
[PKPaymentSummaryItem summaryItemWithLabel:label
                                    amount:amount]
];

if (\[Stripe canSubmitPaymentRequest:request\]) {
    PKPaymentAuthorizationViewController \*paymentController;
    paymentController = \[\[PKPaymentAuthorizationViewController alloc\] initWithPaymentRequest:paymentRequest\];
    paymentController.delegate = self;
    [self presentViewController:paymentController animated:YES completion:nil\];

} else {
// Show the user your own credit card form (see options 2 or 3)

}
```

Note that ViewController is a PKPaymentAuthorizationViewControllerDelegate. By implementing

this protocol, the PKPayment is handled to return the authorization controller.

**Example in Swift**

```swift
// ViewController.swift

func paymentAuthorizationViewController(controller: PKPaymentAuthorizationViewController, didAuthorizePayment payment:
PKPayment, completion: (PKPaymentAuthorizationStatus) -> Void) {
/*
We'll implement this method below in 'Creating a single-use token'.
Note that we've also been given a block that takes a PKPaymentAuthorizationStatus.
We'll call this function with either PKPaymentAuthorizationStatusSuccess or PKPaymentAuthorizationStatusFailure
after all of our asynchronous code is finished executing.
This is how the PKPaymentAuthorizationViewController knows when and how to update its UI.
*/

handlePaymentAuthorizationWithPayment(payment, completion: nil)
}

func paymentAuthorizationViewControllerDidFinish(controller: PKPaymentAuthorizationViewController) {
    dismissViewControllerAnimated(true, completion: nil)
}
```

**Example in Objective-C**

```objectivec
// ViewController.m

- (void)paymentAuthorizationViewController:(PKPaymentAuthorizationViewController *)controller
                       didAuthorizePayment:(PKPayment *)payment
                                completion:(void (^)(PKPaymentAuthorizationStatus))completion {

/*
We'll implement this method below in 'Creating a single-use token'.
Note that we've also been given a block that takes a PKPaymentAuthorizationStatus.
We'll call this function with either PKPaymentAuthorizationStatusSuccess or PKPaymentAuthorizationStatusFailure
after all of our asynchronous code is finished executing.
This is how the PKPaymentAuthorizationViewController knows when and how to update its UI.
*/

[self handlePaymentAuthorizationWithPayment:payment completion:completion];
}

- (void)paymentAuthorizationViewControllerDidFinish:(PKPaymentAuthorizationViewController \*)controller {
[self dismissViewControllerAnimated:YES completion:nil]
;
}
```

To implement optional PKPaymentAuthorizationViewControllerDelegate methods for customer events (such as, to recalculate shipping costs based on user selection, see the [PKPaymentAuthorizationViewController documentation](https://developer.apple.com/documentation/passkit/pkpaymentauthorizationviewcontroller).

**Important**: Before doing the next step, make sure the controller has returned with a PKPayment.

#### Using STPPPaymentCardTextField

To use our pre-built form component, you need to create a view controller called PaymentViewController and add an STPPaymentCardTextField property to it.

**Example in Swift**

```swift
// PaymentViewController.swift

class PaymentViewController: UIViewController, STPPaymentCardTextFieldDelegate {
    let paymentTextField = STPPaymentCardTextField()
}
```

**Example in Objective-C**

```objectivec
// PaymentViewController.m

## import "PaymentViewController.h"

@interface PaymentViewController ()&lt;STPPaymentCardTextField Delegate&gt;
@property(nonatomic) STPPaymentCardTextField \*paymentTextField;
@end
```

To instantiate the STPPaymentCardTextField, set the PaymentViewController as its STPPaymentCardTextFieldDelegate and add it to your view.

**Example in Swift**

```swift
// PaymentViewController.swift

override func viewDidLoad() {
    super.viewDidLoad();
    paymentTextField.frame = CGRectMake(15, 15, CGRectGetWidth(self.view.frame) - 30, 44)
    paymentTextField.delegate = self
    view.addSubview(paymentTextField)
}
```

**Example in Objective-C**

```objectivec
// PaymentViewController.m

- (void)viewDidLoad {
    [super viewDidLoad];
    self.paymentTextField = [[STPPaymentCardTextField alloc] initWithFrame:CGRectMake(15, 15, CGRectGetWidth(self.view.frame) - 30, 44)];
    self.paymentTextField.delegate = self;
    [self.view addSubview:self.paymentTextField];
}
```

By adding an STPPaymentCardTextField to the controller, your app is enabled to accept card numbers, expiration dates, and CVCs. It will also format the input and validate that input on-the-fly.

When a user enters text into this field, the paymentCardTextFieldDidChange method will be called on our view

controller. In this callback, we can enable a save button to allow users to submit their valid cards if the form is valid.

**Example in Swift**

```swift
func paymentCardTextFieldDidChange(textField: STPPaymentCardTextField) {
    // Toggle navigation, for example
    saveButton.enabled = textField.isValid
}
```

**Example in Objective-C**

```objectivec
- (void)paymentCardTextFieldDidChange:(STPPaymentCardTextField *)textField {
    // Toggle navigation, for example
    self.saveButton.enabled = textField.isValid;
}
```

#### Building your own form

To build your own form, make sure you will at least be able to collect your customer's card numbers and expiration dates. We recommend you to also collect the CVC to prevent fraudulent. The user's name and billing address are optional and would benefit you in terms of fraud protection.

### Creating tokens

Our libraries shoulder the burden of PCI compliance by helping you avoid the need to send card data directly to your server. Instead, our libraries send credit card directly to our servers where we can then convert them to tokens. You can charge these tokens later in your server-side code.

#### Using PKPayment (Apple Pay)

After your PKPayment has arrived, you can turn it into a single-use Stripe token with a simple method call by using the following code.

**Example in Swift**

```swift
// ViewController.swift

func handlePaymentAuthorizationWithPayment(payment: PKPayment, completion: PKPaymentAuthorizationStatus -> ()) {
    STPAPIClient.sharedClient().createTokenWithPayment(payment) { (token, error) -> Void in
        if error != nil {
            completion(PKPaymentAuthorizationStatus.Failure)
            return
        }
        /*
        We'll implement this below in "Sending the token to your server".
        Notice that we're passing the completion block through.
        See the above comment in didAuthorizePayment to learn why.
        */
        createBackendChargeWithToken(token, completion: completion)
    }
}
```

**Example in Objective-C**

```objectivec
// ViewController.m

- (void)handlePaymentAuthorizationWithPayment:(PKPayment *) payment
                                   completion:(void (^)(PKPaymentAuthorizationStatus))completion {
    [[STPAPIClient sharedClient] createTokenWithPayment:payment
        completion:^(STPToken *token, NSError *error) {
            if (error) {
                completion(PKPaymentAuthorizationStatus Failure);
                return;
            }
            /*
            We'll implement this below in "Sending the token to your server".
            Notice that we're passing the completion block through.
            See the above comment in didAuthorizePayment to learn why.
            */
            [self createBackendChargeWithToken:token completion:completion];
        }];
}
```

#### Using STPCardParams

If you choose to use STPPaymentCardTextField or your own form, you can assemble the data into an STPCardParams object. After you have collected the card number, expiration dates, and CVC, package them up in an STPCardParams object and invoke the createTokenWithCard method on the STPAIClient class, instructing the library to send off the credit card data to Stripe and return a token.

To do so, add the below code to your program.

**Example in Swift**

```swift
@IBAction func save(sender: UIButton) {
    if let card = paymentTextField.card {
        STPAPIClient.sharedClient().createTokenWithCard(card) { (token, error) -> Void in
            if let error = error {
                handleError(error)
            }
            else if let token = token {
                createBackendChargeWithToken(token) { status in
                ...
                }
            }
        }
    }
}
```

**Example in Objective-C**

```objectivec
- (IBAction)save:(UIButton *)sender {
    [[STPAPIClient sharedClient]
        createTokenWithCard:self.paymentTextField.card completion:^(STPToken *token, NSError *error) {
            if (error) {
                [self handleError:error];
            } else {
                [self createBackendChargeWithToken:token completion:^(PKPaymentAuthorizationStatus status) {
                    ...
                }];
            }
    }];
}
```

**Note**: In the example above, the createTokenWithCard is called when a save button is tapped. It is important that the createToken is not called before user has finished entering their card details.

It is up to you to handle error messages and show activity indicators while creating the token.

### Sending the token to your server

The block you gave to createToken in the previous steps is called whenever Stripe returns with a token (or error). To charge the card, you need to send the token off to your server.

Here is how it looks for a token created with Apple Pay.

**Example in Swift**

```swift
// ViewController.swift

func createBackendChargeWithToken(token: STPToken, completion: PKPaymentAuthorizationStatus -> ()) {
    let url = NSURL(string: "<https://example.com/token>")!
    let request = NSMutableURLRequest(URL: url)
    request.HTTPMethod = "POST"
    let body = "stripeToken=(token.tokenId)"
    request.HTTPBody = body.dataUsingEncoding(NSUTF8StringEncoding)
    let configuration = NSURLSessionConfiguration.ephemeralSessionConfiguration()
    let session = NSURLSession(configuration: configuration)
    let task = session.dataTaskWithRequest(request) { (data, response, error) -> Void in
        if error != nil {
            completion(PKPaymentAuthorizationStatus.Failure)
        }
        else {
            completion(PKPaymentAuthorizationStatus.Success)
        }
    }
    task.resume()
}
```

**Example in Objective-C**

```objectivec
// ViewController.m

- (void)createBackendChargeWithToken:(STPToken *)token
                          completion:(void (^)(PKPaymentAuthorizationStatus))completion {

    NSURL *url = [NSURL URLWithString:@"https://example.com /token"];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url];
    request.HTTPMethod = @"POST";
    NSString *body = [NSString stringWithFormat:@"stripeToken=%@", token.tokenId];
    request.HTTPBody = [body dataUsingEncoding:NSUTF8StringEncoding];
    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
    NSURLSession *session = [NSURLSession sessionWithConfiguration:configuration];
    NSURLSessionDataTask *task =
    [session dataTaskWithRequest:request
        completionHandler:^(NSData *data,
                            NSURLResponse *response,
                            NSError *error) {
            if (error) {
                completion(PKPaymentAuthorizationStatusFailure);
            } else {
                completion(PKPaymentAuthorizationStatusSuccess);
            }
        }];
    [task resume];
}
```

**Note**: The completion callback above is Apple Pay-specific. If you are not using Apple Pay, the code is still mostly the same, but you would want to implement custom error and success handling.

On the server, implement an endpoint that will accept the stripeToken parameter. Make sure any communication with your server is SSL-secured to prevent eavesdropping.

After you have a Stripe token representing a card on your server, charge it, save it for charging later, or sign up for a

subscription.

For more details, see the [full example application](https://github.com/stripe/stripe-ios/tree/master/Example).