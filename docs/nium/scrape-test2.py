from firecrawl import Firecrawl
from bs4 import BeautifulSoup

app = Firecrawl(api_key="fc-ef0e824eba1b43879692883527e79a82")

url = "https://docs.nium.com/api#tag/client-prefund-account/POST/api/v1/client/{clientHashId}/prefund"

result = app.scrape(
    url,
    formats=["markdown", "html"],
    actions=[{"type": "wait", "milliseconds": 7000}]
)

print("Markdown length:", len(result.markdown))
print("HTML length:", len(result.html))

soup = BeautifulSoup(result.html, "html.parser")

target = soup.find(string=lambda s: s and "curl" in s and "gateway.nium.com" in s)

if target:
    container = target.find_parent(["pre", "code", "div"])
    print("Container tag:", container.name)
    print("Container classes:", container.get("class"))
    print("\n--- Extracted text (get_text with separator) ---\n")
    print(container.get_text(separator="\n", strip=True)[:600])
else:
    print("Could not locate the curl text via BeautifulSoup search.")