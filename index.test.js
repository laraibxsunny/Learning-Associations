const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');

 beforeAll(async () => {
    await db.sync({ force: true });
})

 afterAll(async () => {
    await db.close();
  });

describe('Social Sequelzie Test', () => {
    
    test("can create a User", async () => {
        const testUser = await User.create({username: "frances", email: "frances@gmail.com"})
        expect(testUser.username).toBe("frances");
    });

    test("can create a Profile", async () => {
        const testProfile = await Profile.create({bio: "i am frances", profilePicture: "francesPicture", birthday:"20/03/2004"})
        expect(testProfile.birthday).toBe("20/03/2004");
    });

    test("can create a Post", async () => {
        const testPost = await Post.create({title: "frances smiling", body: "this is me smiling", createdAt: "31/10/2024"})
        expect(testPost.title).toBe("frances smiling");
    });

    test("can create a Comment", async () => {
        const testComment = await Comment.create({body: "wow, nice smile", createdAt: "31/10/2024"})
        expect(testComment.createdAt).toBe("31/10/2024");
    });

    test("can create a Like", async () => {
        const testLike = await Like.create({reactionType: "LOVE", createdAt: "31/10/2024"})
        expect(testLike.reactionType).toBe("LOVE");
    });


});

describe("One-to-One: User and Profile Association works Correctly", () => {
  
    test("User has one Profile", async () => {
      const user = await User.create({});
      const profile = await Profile.create({});
  
      await user.setProfile(profile);
  
      const userProfile = await user.getProfile();
  
      expect(userProfile).toBeTruthy();
      expect(userProfile.id).toBe(profile.id);
    });
  });
  