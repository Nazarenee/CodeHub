export default async function Home() {
  const response = await fetch("http://localhost:3000/api/posts");
  const posts = await response.json();

  return (
    <div className="space-y-6 p-6">
      {posts.map(
        (post: {
          id: string;
          title: string;
          text: string;
          language: string;
          image_url: string;
        }) => (
          <div
            key={post.id}
            className="border-2 border-black p-6 rounded-lg w-[600px] mx-auto"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              {post.title}
            </h2>

            <p className="text-sm text-gray-600">{post.language}</p>

            <div className="mt-4">
              <p className="text-gray-800">{post.text}</p>
            </div>

            {post.image_url && (
              <div className="mt-4">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
