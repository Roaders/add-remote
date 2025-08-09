import { UsageGuideConfig } from 'ts-command-line-args';
import { DEFAULT_REMOTE_NAME } from './constants.js';

export interface IAddRemoteArguments {
    remoteName: string;
    gitLocation?: string;
    help: boolean;
}

export const usageGuideInfo: UsageGuideConfig<IAddRemoteArguments> = {
    arguments: {
        remoteName: {
            type: String,
            description: `The name of the remote to add. Defaults to '${DEFAULT_REMOTE_NAME}'`,
            defaultValue: DEFAULT_REMOTE_NAME,
            defaultOption: true,
        },
        gitLocation: { type: String, description: 'The location of the git executable', optional: true },
        help: { type: Boolean, description: 'Show help information' },
    },
    parseOptions: {
        helpArg: 'help',
        baseCommand: `add-remote`,
    },
};
