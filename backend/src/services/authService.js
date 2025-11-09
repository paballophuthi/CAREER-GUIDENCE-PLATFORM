const { admin, db } = require('../firebaseAdmin');

class AuthService {
  async verifyToken(token) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async createCustomToken(uid, additionalClaims = {}) {
    return await admin.auth().createCustomToken(uid, additionalClaims);
  }

  async getUserByEmail(email) {
    try {
      const user = await admin.auth().getUserByEmail(email);
      return user;
    } catch (error) {
      return null;
    }
  }

  async createUser(userData) {
    const user = await admin.auth().createUser({
      email: userData.email,
      password: userData.password,
      displayName: `${userData.firstName} ${userData.lastName}`,
    });

    // Create user profile in Firestore
    await db.collection('users').doc(user.uid).set({
      ...userData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      role: 'student'
    });

    return user;
  }

  async updateUserProfile(uid, updates) {
    await db.collection('users').doc(uid).update({
      ...updates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
}

module.exports = new AuthService();