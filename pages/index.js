function Blog({ posts}) {
 
  return (
    <div class="container">
      {posts.map((post) => (
        
           <div class="container_conten">
              <div class="left">
                <img src={post.image}/>
              </div>
              <div class="right">
                <a href={post.id}> {post.title}</a>
              </div>
              <div class="clear"></div>
            </div>
            
      ))}
    </div>
  )
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://fannews.media/api.php')
  const posts = await res.json()
  const host = context.req.headers['host'];
  

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
     
    },
  }
}

export default Blog