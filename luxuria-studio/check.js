try {
    const { getCliClient } = require('sanity/cli');
    console.log("Success requiring sanity/cli");
} catch (e) {
    console.log("Failed:", e.message);
}
