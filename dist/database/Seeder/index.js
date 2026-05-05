import { UserSeeder } from "./UserSeeder";
async function runSeeders() {
    try {
        await UserSeeder.run();
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