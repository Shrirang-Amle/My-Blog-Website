document.getElementById("blogForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const author = document.getElementById("author").value;
    
    await fetch("http://localhost:5000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author })
    });
    loadBlogs();
});

async function loadBlogs() {
    const res = await fetch("http://localhost:5000/blogs");
    const blogs = await res.json();
    document.getElementById("blogs").innerHTML = blogs.map(blog => `
        <div class="blog">
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <small>${blog.author}</small>
            <br>
            <button onclick="deleteBlog(${blog.id})">Delete</button>
        </div>
    `).join("");
}

async function deleteBlog(id) {
    await fetch(`http://localhost:5000/blogs/${id}`, { method: "DELETE" });
    loadBlogs();
}

loadBlogs();
