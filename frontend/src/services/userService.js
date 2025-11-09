import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion,
  arrayRemove,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase/config';

const usersCollection = collection(db, 'users');
const assessmentsCollection = collection(db, 'assessments');
const careerPathsCollection = collection(db, 'careerPaths');

export const createUserProfile = async (userId, userData) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    ...userData,
    updatedAt: new Date().toISOString()
  });
};

export const getUserProfile = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

export const updateUserProfile = async (userId, updates) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: new Date().toISOString()
  });
};

export const saveAssessmentResult = async (userId, assessmentData) => {
  const assessmentRef = doc(assessmentsCollection);
  await setDoc(assessmentRef, {
    userId,
    ...assessmentData,
    createdAt: new Date().toISOString()
  });
  
  // Update user profile with assessment results
  await updateUserProfile(userId, {
    lastAssessment: assessmentData,
    skills: assessmentData.skills,
    interests: assessmentData.interests
  });
};

export const getCareerRecommendations = async (skills, interests) => {
  const q = query(
    careerPathsCollection,
    where('requiredSkills', 'array-contains-any', skills),
    where('categories', 'array-contains-any', interests)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveCareerGoal = async (userId, careerGoal) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    careerGoals: arrayUnion({
      ...careerGoal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    })
  });
};