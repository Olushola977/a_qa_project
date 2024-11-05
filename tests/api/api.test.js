const { test, expect } = require('@playwright/test');
const { postSchema } = require('../../schemas/post');
const Ajv = require('ajv');

test.describe.serial("End to End test for posts", () => {
    let totalPosts;
    let newPostId;
    let title = "Edited Title"
    const ajv = new Ajv();

    test('Get Post Count', async ({ request }) => {
        const postsResponse = await request.get(`/posts`);
        expect(postsResponse.ok()).toBeTruthy();
        const posts = await postsResponse.json()
        totalPosts = await posts.length
    });

    test('Create a Post', async ({ request }) => {
        //The response is mocked and not updated on the server
        const newPostResponse = await request.post(`/posts`, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            data: JSON.stringify({
                title: 'Sample Post Title',
                body: 'Sample post body',
                userId: 10,
            })
        });
        const newPost = await newPostResponse.json()

        expect(newPostResponse.ok()).toBeTruthy();
        expect(newPostResponse.status(), "Status should be 201").toBe(201);

        const validate = ajv.compile(postSchema);
        const valid = validate(newPost);
        expect(valid, "Validate Response Schema").toBe(true);

        newPostId = await newPost.id
    });

    test('Get a Post', async ({ request }) => {
        /*
        The newly created post cannot be gotten from the server
        because the record does not exist, create response was mocked hence the empty object
        */
        const postResponse = await request.get(`/posts/${newPostId}`);
        // expect(postResponse.ok()).toBeTruthy();
        const post = await postResponse.json()
        console.log(post)
    });

    test('Update a Post', async ({ request }) => {
        const updatedPostResponse = await request.patch(`/posts/100`, {
            data: {
                title: title
            }
        });
        expect(updatedPostResponse.ok()).toBeTruthy();
        expect(updatedPostResponse.status(), "Status should be 200").toBe(200);
        const post = await updatedPostResponse.json()

        const validate = ajv.compile(postSchema);
        const valid = validate(post);
        expect(valid, "Validate Response Schema").toBe(true);

        expect(post.title, "Title is updated successfully").toEqual(`${title}`)
    });

    test('Delete a Post', async ({ request }) => {
        const deletedPostResponse = await request.delete(`/posts/100`);
        expect(deletedPostResponse.ok()).toBeTruthy();
        const deletedPost = await deletedPostResponse.json()
        expect(deletedPost).toEqual({})

        //Get all posts and verify post count
        const postsResponse = await request.get(`/posts`);
        expect(postsResponse.ok()).toBeTruthy();
        const posts = await postsResponse.json()
        console.log(posts.length)
        expect(posts.length).toEqual(totalPosts)
    });
})