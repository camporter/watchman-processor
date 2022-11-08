import 'reflect-metadata';

import { Cli, ConfigManager, WatchmanProcessor } from '../interfaces';
import { Bindings } from './ioc.bindings';
import { container } from './ioc.config';

const cli = container.get<Cli>(Bindings.Cli);
const configManager = container.get<ConfigManager>(Bindings.ConfigManager);
const watchmanProcessor = container.get<WatchmanProcessor>(Bindings.WatchmanProcessor);

const args = cli.getArguments();
let processor = watchmanProcessor;

process.title = 'watchman-processor';

if (args.init) {
  configManager.createConfig()
    .then((configCreated: boolean) => {
      if (!configCreated) {
        process.stderr.write('Configuration file already exists!\n');
        process.exit(1);
      }
    });
} else {
  const config = configManager.getConfig();
  if (config instanceof Error) {
    processor = null as any;
    process.stderr.write(config.message + '\n');
    if (config.name !== 'init') {
      process.stderr.write(config.name);
      if (config.stack) {
        process.stderr.write(config.stack);
      }
    }
  }
  processor.start()
    process.on('SIGINT', function() {
      processor.end().then(function() {
        process.exit();
      });
    });
}

export default processor;
