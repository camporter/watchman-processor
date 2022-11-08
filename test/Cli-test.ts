import { assert } from 'chai';
// import { resolve } from 'path';
// import { stub } from 'sinon';
import * as interfaces from '../interfaces';
import { Bindings } from '../src/ioc.bindings';
import { container } from '../src/ioc.config';

describe('Cli', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const setArgs = (...args: string[]) => {
      container.rebind(Bindings.Process).toConstantValue({
          argv: args,
          cwd: () => 'test',
      });
  };

  const getArgs = () => {
      const cli = container.get<interfaces.Cli>(Bindings.Cli);
      return cli.getArguments();
  };

  it('should parse the -i flag', () => {
    setArgs('-i');
    const args = getArgs();

    assert.isTrue(args.init);
  });

  it('should parse the --init flag', () => {
    setArgs('--init');
    const args = getArgs();

    assert.isTrue(args.init);
  });

  it('should parse the -c flag', () => {
    setArgs('-c');
    const args = getArgs();

    assert.match(args.config, /^test/i);
  });

  it('should parse the --config flag', () => {
    setArgs('--config');
    const args = getArgs();

    assert.match(args.config, /^test/i);
  });

  it('should parse the --config flag and next parameter', () => {
    setArgs('--config', '/second-param');
    const args = getArgs();

    assert.match(args.config, /^\/second-param/i);
  });
});
