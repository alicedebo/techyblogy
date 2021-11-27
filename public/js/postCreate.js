const createPost = async (event) => {
    event.preventDefault();

    const post = {
        title: document.querySelector('#post-title').value.trim(),
        description: document.querySelector('#post-description').value.trim(),
        user_id: null
    };

    const fetchPost = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: { 'Content-Type': 'application/json' }
    });

    if (fetchPost.ok) {
        location.replace('/dashboard');
    } else {
        alert('Failed to create a new post')
    }
}

document.querySelector('.create-form').addEventListener('submit', createPost)