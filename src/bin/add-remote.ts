#!/usr/bin/env node

import { parse } from 'ts-command-line-args';
import { usageGuideInfo } from '../write-markdown.constants.js';
import { addRemote } from '../helpers/index.js';
import { IAddRemoteArguments } from '../contracts.js';

function main() {
    const args = parse<IAddRemoteArguments>(usageGuideInfo.arguments, usageGuideInfo.parseOptions);

    addRemote(args.remoteName, args.gitLocation);
}

main();
