const editPost = async (event) => {
    event.preventDefault();

    const pathParams = window.location.pathname + window.location.search;
    const pathArry = pathParams.split('/');
    const postId = pathArry[2];

    const post = {
        title: document.querySelector('#post-title').value.trim(),
        description: document.querySelector('#post-description').value.trim(),
        post_id: postId,
        user_id: null
    };

    const putFetch = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: { 'Content-Type': 'application/json' }
    });

    if (putFetch.ok) {
        location.replace(`/post/${postId}`)
    } else {
        alert('Failed to edit post')
    }
}

document.querySelector('.edit-form').addEventListener('submit', editPost)