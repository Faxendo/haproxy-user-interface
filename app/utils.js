const utils = {
    checkEnvVar: name => {
        if (process.env[name] === undefined) {
            console.error(`Missing ${name} env var`);
            process.exit();
            return;
        }
    }
};

module.exports = utils;