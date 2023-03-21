function help(): void {
    process.stdout.write(`Usage ${process.argv[1].split("/").slice(-1)} [options] [file]`);
    process.stdout.write(`\n\n`);
    process.stdout.write(`Options:\n`);
    process.stdout.write(`\t-o, --output [file (json or yaml)]\t`);
    process.stdout.write(`Output format (default: text)\n`);
    process.stdout.write(`\t-swf, --stop-when-fail\t`);
    process.stdout.write(`Stop when a test fails (default: false)\n`);
    process.stdout.write(`\t-t, --timeout [number]\t`);
    process.stdout.write(`Timeout in milliseconds (default: -1)\n`);
    process.stdout.write(`\t-v, --verbose\t`);
    process.stdout.write(`Verbose output (default: false)\n`);
    process.stdout.write(`\t-s, --status\t`);
    process.stdout.write(`Show status (default: false)\n`);
    process.stdout.write(`\t-r, --runList [number,number,...]\t`);
    process.stdout.write(`Run only specified tests (default: [])\n`);
    process.stdout.write(`\t-h, --help\t`);
    process.stdout.write(`Show this help message\n`);
    process.stdout.write(`\n`);
}

export default help;
