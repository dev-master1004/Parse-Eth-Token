import { resolve } from 'path';
import { tmpdir } from 'os';
import { number, object, string } from '@hapi/joi';

type ValueOf<T> = T[keyof T];

export const VERSION = '1.0.0';
export const REPO_URL = 'https://github.com/ethereum-lists/tokens.git';
export const OUTPUT_PATH = resolve(tmpdir(), 'ethereum-lists/tokens');

/**
 * `name` taken from `ethereum-lists/tokens` (https://github.com/ethereum-lists/tokens/tree/master/tokens)
 * `chainId` taken from https://chainid.network/
 */
export const NETWORKS = [
  {
    name: 'ella',
    chainId: 64
  },
  {
    name: 'esn',
    chainId: 31102
  },
  {
    name: 'etc',
    chainId: 61
  },
  {
    name: 'eth',
    chainId: 1
  },
  {
    name: 'gor',
    chainId: 5
  },
  {
    name: 'kov',
    chainId: 42
  },
  {
    name: 'rin',
    chainId: 4
  },
  {
    name: 'rop',
    chainId: 3
  },
  {
    name: 'ubq',
    chainId: 8
  }
];

export const NETWORK_NAMES = NETWORKS.map(network => network.name);

export const SOCIAL_SCHEMA = object({
  blog: string()
    .empty('')
    .default(''),
  chat: string()
    .empty('')
    .default(''),
  facebook: string()
    .empty('')
    .default(''),
  forum: string()
    .empty('')
    .default(''),
  github: string()
    .empty('')
    .default(''),
  gitter: string()
    .empty('')
    .default(''),
  instagram: string()
    .empty('')
    .default(''),
  linkedin: string()
    .empty('')
    .default(''),
  reddit: string()
    .empty('')
    .default(''),
  slack: string()
    .empty('')
    .default(''),
  telegram: string()
    .empty('')
    .default(''),
  twitter: string()
    .empty('')
    .default(''),
  youtube: string()
    .empty('')
    .default('')
});

const DEPRECATED_TOKEN_SCHEMA = object({
  new_address: string()
});

/**
 * Validation schema.
 */
export const TOKEN_SCHEMA = object({
  address: string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .required(),
  decimals: number()
    .min(0)
    .required(),
  deprecation: DEPRECATED_TOKEN_SCHEMA,
  name: string().required(),
  social: SOCIAL_SCHEMA,
  symbol: string().required(),
  website: string()
    .empty('')
    .default('')
}).options({ stripUnknown: true });

/**
 * Raw token data that is loaded from the JSON files.
 */
export interface TokenSocialMetadata {
  blog?: string;
  chat?: string;
  facebook?: string;
  forum?: string;
  github?: string;
  gitter?: string;
  instagram?: string;
  linkedin?: string;
  reddit?: string;
  slack?: string;
  telegram?: string;
  twitter?: string;
  youtube?: string;
}
/**
 * Raw token data that is loaded from the JSON files.
 */
export interface RawToken {
  address?: string;
  decimals?: number | string;
  deprecation?: any;
  name?: string;
  social?: TokenSocialMetadata;
  symbol?: string;
  website?: any;
}

/**
 * Parsed token data.
 */
export interface Token {
  address: string;
  decimals: number;
  deprecation?: any;
  name: string;
  newSymbol?: any;
  social?: TokenSocialMetadata;
  symbol: string;
  uuid: string;
  website?: any;
}
