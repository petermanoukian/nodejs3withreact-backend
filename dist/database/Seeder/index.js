"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserSeeder_1 = require("./UserSeeder");
async function runSeeders() {
    try {
        await UserSeeder_1.UserSeeder.run();
        console.log("✅ All seeders executed successfully");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error running seeders:", error);
        process.exit(1);
    }
}
runSeeders();
//# sourceMappingURL=index.js.map