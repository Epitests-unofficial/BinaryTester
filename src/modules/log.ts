function error(message: string): void {
    process.stderr.write(message);
    process.stderr.write('\n');
    process.exit(1);
}

export default error;