import { AIGuard } from '@crowdstrike/aidr';
import { type ClientOptions, OpenAI } from 'openai';
import type * as API from 'openai/resources';

import * as Errors from './core/error.js';
import { readEnv } from './internal/utils/env.js';
import { AidrResponses } from './resources/responses/responses.js';

export class AidrOpenAI extends OpenAI {
  readonly aiGuardClient: AIGuard;

  constructor({
    baseURL = readEnv('OPENAI_BASE_URL'),
    apiKey = readEnv('OPENAI_API_KEY'),
    organization = readEnv('OPENAI_ORG_ID') ?? null,
    project = readEnv('OPENAI_PROJECT_ID') ?? null,
    webhookSecret = readEnv('OPENAI_WEBHOOK_SECRET') ?? null,
    aidrApiKey,
    aidrBaseURLTemplate,
    ...opts
  }: ClientOptions & {
    aidrApiKey?: string;
    aidrBaseURLTemplate?: string;
  } = {}) {
    if (!aidrApiKey) {
      throw new Errors.AidrError(
        'Missing credentials. Please pass a `aidrApiKey`.'
      );
    }
    if (!aidrBaseURLTemplate) {
      throw new Errors.AidrError(
        'Missing base URL template. Please pass a `aidrBaseURLTemplate`.'
      );
    }

    super({
      baseURL,
      apiKey,
      organization,
      project,
      webhookSecret,
      ...opts,
    });

    this.aiGuardClient = new AIGuard({
      token: aidrApiKey,
      baseURLTemplate: aidrBaseURLTemplate,
    });
  }

  responses: API.Responses = new AidrResponses(this);
}
