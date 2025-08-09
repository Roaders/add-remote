import { UsageGuideConfig } from 'ts-command-line-args';
import { DEFAULT_REMOTE_NAME } from './constants.js';
import { IAddRemoteArguments } from './contracts.js';

export const usageGuideInfo: UsageGuideConfig<IAddRemoteArguments> = {
    arguments: {
        remoteName: {
            type: String,
            description: `The name of the remote to add. Defaults to '${DEFAULT_REMOTE_NAME}'`,
            defaultValue: DEFAULT_REMOTE_NAME,
            defaultOption: true,
        },
        gitLocation: { type: String, alias: 'g', description: 'The location of the git executable', optional: true },
        help: { type: Boolean, alias: 'h', description: 'Show help information' },
    },
    parseOptions: {
        helpArg: 'help',
        baseCommand: `add-remote`,
        headerContentSections: [
            {
                header: 'Add Remote',
                content: `{code.bash $ npx add-remote}`,
            },
            {
                content: `This script will take the git repository url from your package.json file and will add it as a remote and then fetch that remote. The remote name defaults to {highlight upstream}`,
            },
            {
                content: `{code.bash $ npx add-remote public}`,
            },
            {
                content: `Creates a remote with a different name. In this case {highlight public}`,
            },
        ],
    },
};
