# Card reissue FAQ

## General

For instructions on how to reissue a card, see [Reissuing a card](doc:reissuing-a-card).

For general questions regarding the Atelio platform, see [FAQ](doc:faq).

## Physical cards

<details>
    <summary>**Do you need to inform the user to update their card details when the physical card is activated?**</summary>

Yes, you need to inform the user to update their card.
</details>

<details>
    <summary>**What's the difference between virtual and physical cards?**</summary>

The card number may be different and the expiration date is always different.

A card can be virtual, physical, or dual, which is determined by the `program_id` that is provided by Atelio based on your Brand requirements. Upon creation of a card, your customer can immediately use the virtual card. If they've been issued with a physical card, this is shipped to them and they can only use it after it's been activated, at which point the virtual card ceases to exist. Any future card reissues only reissue a physical card.

For details, see [Card configurations](doc:card-program-id#card-configurations) and [activating a physical card](https://docs.atelio.com/embedded/docs/changing-the-card-status#activating-a-physical-card).
</details>

## Card reissuing

### Due to expiring

<details>
    <summary>**When will my replacement card arrive?**</summary>

30 days before your card expires, a replacement card is automatically sent to you.
</details>

<details>
    <summary>**Which details change and which stay the same?**</summary>

The card number stays the same while the CVV and expiration date change.
</details>

### Due to being lost or stolen

<details>
    <summary>**What reissue type should be used?**</summary>

Use the `new_card_number` reissue type.
</details>

<details>
    <summary>**Which details change and which stay the same?**</summary>

The CVV, card number, and expiration date all change.
</details>

### Due to damage to the old card

<details>
    <summary>**What type of card reissue should you use and what details change?**</summary>

You should use the `same_card_number` reissue type.

All card information remains the same and the cardholder can still use the old card to make purchases.
</details>

<details>
    <summary>**Is there a way to test this?**</summary>

When a damaged card is reissued, none of the card details change. It should work immediately.
</details>

<details>
    <summary>**If the customer wants the CVV and expiration date to change, what reissue type should be used?**</summary>

Use the `same_card_number_expiry` reissue type. This results in a change to the expiration date.
</details>

## API fields

<details>
    <summary>**What does the `same_card_number_updated_expiry` change?**</summary>

The `same_card_number_updated_expiry` type results in the same card number, a new CVV, and a new expiration date.
</details>

## When cancelled

<details>
    <summary>**Does the old card get cancelled immediately or can the cardholder keep using it until the new card is received?**</summary>

The cardholder can keep using the old card until they receive the new replacement card. This does not apply if you use `new_card_number`.
</details>

## Notes

- If a card is lost or stolen, use `new_card_number`. The card number, CVV, and expiration date change.
- If a card is old or damaged, use `same_card_number_updated_expiry`. Only the CVV and expiration date change, the card number stays the same.
