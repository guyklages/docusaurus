from firecrawl import Firecrawl
import re

app = Firecrawl(api_key="fc-ef0e824eba1b43879692883527e79a82")

url = "https://docs.nium.com/api#tag/client-prefund-account/POST/api/v1/client/{clientHashId}/prefund"

result = app.scrape(
    url,
    formats=["markdown", "html"],
    actions=[{"type": "wait", "milliseconds": 4000}]
)

html = result.html

# Strip HTML tags so span-splitting can't hide real text from a simple search
visible_text = re.sub(r"<[^<]+?>", " ", html)
visible_text = re.sub(r"\s+", " ", visible_text)  # collapse repeated whitespace

# Single-word counts (less likely to be broken up by tag boundaries)
for word in ["curl", "POST", "Authorization", "gateway.nium.com"]:
    print(f"{word!r} count: {visible_text.count(word)}")

# Try the phrase search again, now on cleaned text
print("'curl -X POST' found (cleaned):", "curl -X POST" in visible_text)

# If 'curl' shows up, print some surrounding context so we can see what's actually there
idx = visible_text.find("curl")
if idx != -1:
    print("\nContext around first 'curl' match:\n")
    print(visible_text[max(0, idx - 100): idx + 300])
else:
    print("\n'curl' does not appear anywhere in the visible text.")