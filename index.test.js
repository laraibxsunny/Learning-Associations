const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require("./db/connection.js");

beforeAll(async () => {
  await db.sync({ force: true });
});

afterAll(async () => {
  await db.close();
});

describe("Social Sequelzie Test", () => {
  test("can create a User", async () => {
    const testUser = await User.create({
      username: "frances",
      email: "frances@gmail.com",
    });
    expect(testUser.username).toBe("frances");
  });

  test("can create a Profile", async () => {
    const testProfile = await Profile.create({
      bio: "i am frances",
      profilePicture: "francesPicture",
      birthday: "20/03/2004",
    });
    expect(testProfile.birthday).toBe("20/03/2004");
  });

  test("can create a Post", async () => {
    const testPost = await Post.create({
      title: "frances smiling",
      body: "this is me smiling",
      createdAt: "31/10/2024",
    });
    expect(testPost.title).toBe("frances smiling");
  });

  test("can create a Comment", async () => {
    const testComment = await Comment.create({
      body: "wow, nice smile",
      createdAt: "31/10/2024",
    });
    expect(testComment.createdAt).toBe("31/10/2024");
  });

  test("can create a Like", async () => {
    const testLike = await Like.create({
      reactionType: "LOVE",
      createdAt: "31/10/2024",
    });
    expect(testLike.reactionType).toBe("LOVE");
  });
});

describe("One-to-One: User and Profile Association works Correctly", () => {
  test("User has one Profile", async () => {
    //Arrange
    const user = await User.create({});
    const profile = await Profile.create({});

    //Act
    await user.setProfile(profile);
    const userProfile = await user.getProfile();

    //Assert
    expect(userProfile).toBeTruthy();
    expect(userProfile.id).toBe(profile.id);
  });
});

describe("One-to-Many: User and Post Association works Correctly", () => {
  test("User has many Posts", async () => {
    //Arrange
    const user = await User.create({
      username: "john_doe",
      email: "john_doe@example.com",
    });

    const post1 = await Post.create({
      title: "Hiking in Yosemite",
      body: "I had an amazing time hiking in Yosemite National Park!",
      createdAt: "2022-03-15T10:30:00.000Z",
    });
    const post2 = await Post.create({
      title: "London Street Photography",
      body: "Here are some of my recent street photography shots from London.",
      createdAt: "2022-03-18T14:15:00.000Z",
    });

    //Act
    await user.setPosts([post1, post2]);

    const userWithPosts = await User.findOne({
      where: { username: "john_doe" },
      include: Post,
    });

    //Assert
    expect(userWithPosts.Posts.length).toBe(2);
    expect(userWithPosts.Posts[0].title).toBe("Hiking in Yosemite");
    expect(userWithPosts.Posts[1].title).toBe("London Street Photography");
  });
});

describe("One-to-Many: User and Post Association works Correctly", () => {
  test("Post has many Comments", async () => {
    //Arrange
    const post = await Post.create({
      title: "New JavaScript Framework",
      body: "I'm excited to announce the release of our new JavaScript framework!",
      createdAt: "2022-03-21T09:00:00.000Z",
    });

    const comment1 = await Comment.create({
      body: "This is a great post!",
      createdAt: "2022-01-01T12:00:00Z",
    });

    const comment2 = await Comment.create({
      body: "Can you explain this point further?",
      createdAt: "2022-01-02T10:45:00Z",
    });

    //Act
    await post.setComments([comment1, comment2]);

    const postWithComments = await Post.findOne({
      where: { title: "New JavaScript Framework" },
      include: Comment,
    });

    //Assert
    expect(postWithComments.Comments.length).toBe(2);
    expect(postWithComments.Comments[0].body).toBe("This is a great post!");
    expect(postWithComments.Comments[1].createdAt).toBe("2022-01-02T10:45:00Z");
  });
});

describe("Many-to-Many: User and Like Association works Correctly", () => {
  test("User has many Likes and Like has many Users", async () => {
    //Arrange
    const user1 = await User.create({
      username: "bob_smith",
      email: "bob_smith@example.com",
    });

    const user2 = await User.create({
      username: "alice_wonderland",
      email: "alice_wonderland@example.com",
    });

    const like1 = await Like.create({
      reactionType: "👍",
      createdAt: "2022-03-20T10:00:00Z",
    });

    const like2 = await Like.create({
      reactionType: "❤️",
      createdAt: "2022-03-21T12:30:00Z",
    });

    //Act
    await user1.setLikes([like1, like2]);

    const userWithLikes = await User.findOne({
      where: { username: "bob_smith" },
      include: Like,
    });

    await like1.setUsers([user1, user2]);

    const likeWithUsers = await Like.findOne({
      where: { reactionType: "👍" },
      include: User,
    });

    //Assert
    expect(userWithLikes.Likes.length).toBe(2);
    expect(userWithLikes.Likes[0].reactionType).toBe("👍");
    expect(userWithLikes.Likes[1].createdAt).toBe("2022-03-21T12:30:00Z");
    expect(likeWithUsers.Users.length).toBe(2);
    expect(likeWithUsers.Users[0].username).toBe("bob_smith");
    expect(likeWithUsers.Users[1].email).toBe("alice_wonderland@example.com");
  });
});
