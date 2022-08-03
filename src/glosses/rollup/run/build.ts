import { InputOptions, OutputOptions, RollupBuild, SourceMap } from './rollup/types';
import relativeId from './rollup/utils/relativeId';
import { handleError, stderr } from './logging';
import SOURCEMAPPING_URL from './sourceMappingUrl';
import { BatchWarnings } from './batchWarnings';
import { printTimings } from './timings';

const {
	cli: { chalk },
	rollup
} = ateos;

export default function build(
	inputOptions: InputOptions,
	outputOptions: OutputOptions[],
	warnings: BatchWarnings,
	silent = false
) {
	const useStdout = !outputOptions[0].file && !outputOptions[0].dir;

	const start = Date.now();
	const files = useStdout
		? ['stdout']
		: outputOptions.map(t => relativeId(t.file || (t.dir as string)));
	if (!silent) {
		let inputFiles: string = undefined as any;
		if (typeof inputOptions.input === 'string') {
			inputFiles = inputOptions.input;
		} else if (inputOptions.input instanceof Array) {
			inputFiles = inputOptions.input.join(', ');
		} else if (typeof inputOptions.input === 'object' && inputOptions.input !== null) {
			inputFiles = Object.keys(inputOptions.input)
				.map(name => (inputOptions.input as Record<string, string>)[name])
				.join(', ');
		}
		stderr(chalk.cyan(`\n${chalk.bold(inputFiles)} → ${chalk.bold(files.join(', '))}...`));
	}

	return rollup
		.rollup(inputOptions as any)
		.then((bundle: RollupBuild) => {
			if (useStdout) {
				const output = outputOptions[0];
				if (output.sourcemap && output.sourcemap !== 'inline') {
					handleError({
						code: 'MISSING_OUTPUT_OPTION',
						message: 'You must specify a --file (-o) option when creating a file with a sourcemap'
					});
				}

				return bundle.generate(output).then(({ output: outputs }) => {
					for (const file of outputs) {
						let source: string | Buffer;
						if (file.type === 'asset') {
							source = file.source;
						} else {
							source = file.code;
							if (output.sourcemap === 'inline') {
								source += `\n//# ${SOURCEMAPPING_URL}=${(file
									.map as SourceMap).toUrl()}\n`;
							}
						}
						if (outputs.length > 1)
							process.stdout.write('\n' + chalk.cyan(chalk.bold('//→ ' + file.fileName + ':')) + '\n');
						process.stdout.write(source);
					}
					return null
				});
			}

			return Promise.all(outputOptions.map(output => bundle.write(output) as Promise<any>)).then(
				() => bundle
			);
		})
		.then((bundle: RollupBuild | null) => {
			if (!silent) {
				warnings.flush();
				stderr(
					chalk.green(`created ${chalk.bold(files.join(', '))} in ${chalk.bold(ateos.pretty.ms(Date.now() - start))}`)
				);
				if (bundle && bundle.getTimings) {
					printTimings(bundle.getTimings());
				}
			}
		})
		.catch((err: any) => {
			if (warnings.count > 0) warnings.flush();
			handleError(err);
		});
}
