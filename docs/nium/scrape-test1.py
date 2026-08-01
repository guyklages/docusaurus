from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-ef0e824eba1b43879692883527e79a82")

url = "https://docs.nium.com/api#tag/client-prefund-account/POST/api/v1/client/{clientHashId}/prefund"

result = app.scrape(
    url,
    formats=["markdown", "html"],
    actions=[{"type": "wait", "milliseconds": 4000}]
)

# Check what actually came back before trusting it
print(result.markdown[:500])  # print the first 500 chars to eyeball it

# Save the markdown so you can drop it straight into your own site
with open("nium-prefund-account.md", "w") as f:
    f.write(result.markdown)