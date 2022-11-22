let queryString = new URLSearchParams(window.location.href.split("?")[1]);
let singlePost = {};
const slug = queryString.get("slug");
const selectedPost = document.querySelector(".single-post");

console.log("postId: ", queryString.get("slug"));

const getSinglePosts = async (slug) => {
  const res = await fetch(`https://www.wp-course.site/wp-json/youthink/post?slug=${slug}`);
  const data = await res.json();
  singlePost = [];
  singlePost = { ...data.data };
};

await getSinglePosts(slug);
console.log(singlePost);



selectedPost.innerHTML = `<div class="posts">
        <img
          src="${singlePost.thumbnail}"
          alt="" class="img-style" style="align-items:center;margin-top:150px;
        />
        <div class="post-info" id="divData" data-full-content=${singlePost.excerpt}>
        <h3 style="font-size:18px;justify-content:center">
          ${singlePost.title}
          </h3>
          <p>
           ..........
          </p>
        </div>
      </div>
`;

