# CrowdStrike AIDR + OpenAI TypeScript API Library

A wrapper around the OpenAI TypeScript library that wraps the [Responses API](https://platform.openai.com/docs/api-reference/responses)
with CrowdStrike AIDR. Supports Node.js v22 and greater.

## Installation

```bash
npm install @crowdstrike/aidr-openai
```

## Usage

```typescript
import { AidrOpenAI } from "@crowdstrike/aidr-openai";

const client = new AidrOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  aidrApiKey: process.env.AIDR_API_KEY,
});

const response = await client.responses.create({
  model: "gpt-4o-mini",
  instructions: "You are a helpful assistant.",
  input: "Are semicolons optional in JavaScript?",
});

console.log(response.output_text);
```

### Azure OpenAI

To use this library with [Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/overview),
use the `AidrAzureOpenAI` class with an Azure base URL.

```typescript
import { AidrAzureOpenAI } from "@crowdstrike/aidr-openai";

const client = new AidrAzureOpenAI({
  baseURL: "https://YOUR-RESOURCE-NAME.openai.azure.com/openai/v1/",
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  aidrApiKey: process.env.AIDR_API_KEY,
});

const response = await client.responses.create({
  model: "gpt-4o-mini",
  instructions: "You are a helpful assistant.",
  input: "Are semicolons optional in JavaScript?",
});

console.log(response.output_text);
```
