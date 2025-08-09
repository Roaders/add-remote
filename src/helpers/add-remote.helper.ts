import messageAwait from 'message-await';
import { packageJsonPath } from '../constants.js';
import { readFile } from 'fs';
import { promisify } from 'util';
import chalk from 'chalk';
import { isRepositoryDetails } from './type-guards.js';
import { resolve } from 'path';
import { SimpleGit, simpleGit } from 'simple-git';

const readFileAsync = promisify(readFile);

const print = messageAwait.default;

//https://regex101.com/r/aeUtNs/1
const urlRegExp = /^(git\+)?(.+)$/;

export async function addRemote(remoteName: string, gitLocation?: string): Promise<void> {
    const repoUrl = await loadRepoUrl();

    if (repoUrl == null) {
        return;
    }

    const git = simpleGit(undefined, { binary: gitLocation });

    await addRemoteImpl(git, remoteName, repoUrl);

    await fetchRemote(git, remoteName);
}

async function loadRepoUrl(): Promise<string | undefined> {
    let repositoryDetails: unknown;

    const path = resolve(packageJsonPath);

    try {
        repositoryDetails = await print(`Loading ${packageJsonPath}`, { format: chalk.blue })
            .await(readFileAsync(path))
            .then((buffer) => JSON.parse(buffer.toString()));
    } catch {
        console.error(chalk.red(`Error reading ${path}`));
        return;
    }

    if (!isRepositoryDetails(repositoryDetails)) {
        console.error(chalk.red(`No valid git repository found in ${packageJsonPath}`));
        return;
    }

    const regexpResult = urlRegExp.exec(repositoryDetails.repository.url);

    if (regexpResult == null) {
        console.error(chalk.red(`Unable to parse repository URL from '${repositoryDetails.repository.url}'`));
        return;
    }

    const repoUrl = regexpResult[2];

    console.log(chalk.green(`Repository URL: ${repoUrl}`));
    console.log(``);

    return repoUrl;
}

async function addRemoteImpl(git: SimpleGit, remoteName: string, repoUrl: string): Promise<boolean> {
    const remotes = await git.getRemotes(true);

    const existingRemote = remotes.find((remote) => remote.name === remoteName);

    if (existingRemote != null) {
        if (existingRemote.refs.fetch === repoUrl && existingRemote.refs.push === repoUrl) {
            console.log(chalk.blue(`Remote '${remoteName}' already exists.`));
        } else {
            const differentUrl =
                existingRemote.refs.fetch !== repoUrl ? existingRemote.refs.fetch : existingRemote.refs.push;

            console.log(chalk.red(`Remote '${remoteName}' already exists but with a different URL: ${differentUrl}`));

            return false;
        }
    } else {
        await print(`Adding remote '${remoteName}'`, { format: chalk.blue }).await(git.addRemote(remoteName, repoUrl));
    }

    return true;
}

async function fetchRemote(git: SimpleGit, remoteName: string): Promise<void> {
    await print(`Fetching remote '${remoteName}'`, { format: chalk.blue }).await(git.fetch(remoteName));
}
