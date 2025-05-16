const { MongoClient } = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'youtube_app';

// Test cases
async function runTests() {
  const client = new MongoClient(url);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Test 1: User collection exists
    const collections = await db.listCollections().toArray();
    assert(collections.some(c => c.name === 'users'), 'Users collection missing');

    // Test 2: Can insert and retrieve user data
    const users = db.collection('users');
    const testUser = { 
      _id: 'test_' + Date.now(),
      name: 'Test User',
      favorites: []
    };
    
    // Insert test
    const insertResult = await users.insertOne(testUser);
    assert.strictEqual(insertResult.insertedCount, 1, 'Insert failed');

    // Query test
    const foundUser = await users.findOne({ _id: testUser._id });
    assert.strictEqual(foundUser.name, 'Test User', 'User not found');

    // Cleanup
    await users.deleteOne({ _id: testUser._id });
    console.log('All database tests passed!');

  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await client.close();
  }
}

runTests();