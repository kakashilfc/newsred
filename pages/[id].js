import Head from 'next/head'
import Image from 'next/image'


function Blog({ results,meta}) {
 
    return (
      <div class="container_detail">
        <Head>
          <title>{results.title}</title>
          <meta name="description" content={results.description}/>
          <meta property="og:locale" content="us_US" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={results.title}/>
          <meta property="og:description" content={results.description}/>
          <meta property="og:url" content={meta.url}/>
          <meta property="og:site_name" content={meta.host}/>
          <meta property="og:image" content={results.image} />
          <meta property="og:image:secure_url" content={results.image} />
          <meta property="og:image:width" content="750" />
          <meta property="og:image:height" content="390" />
          <meta property="og:image:alt" content={results.title}/>
          <meta property="og:image:type" content="image/jpeg" />
          
          <link rel="icon" href="/favicon.ico" />
        </Head>
            
          <div >
            <h1 dangerouslySetInnerHTML={{__html: results.title}}></h1>
            <article  dangerouslySetInnerHTML={{__html: results.content}}></article>
          </div>
        </div>
    )
  }
  
  
  export async function getServerSideProps(context) {
    const id = context.params.id;
    
    //var user_agent = context.req.headers['user-agent'];
    var user_agent = context.req.headers['referer'];
    if(typeof user_agent == 'undefined' || typeof user_agent == '' ){
      user_agent ="bot or user link";
    }

    const host = context.req.headers['host'];
    const url  = 'https://'+ host +'/'+id;
      if (user_agent.match(/facebook/i)) {
        return {
          redirect: {
              destination: 'https://fannews.media/'+id,
        permanent: false,
          },
        };
      }else{
  
        const res = await fetch('https://fannews.media/api.php?id='+id)
        const posts = await res.json()
        return {
            props: {
              results: posts,
              meta: {host:host,url:url},
            },
        }
      }
      
  }
  
  export default Blog