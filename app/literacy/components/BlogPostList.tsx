import Link from 'next/link'

const blogPosts = [
    {
        id: 1,
        title: "5 Effective Budgeting Strategies for Beginners",
        excerpt: "Learn how to create and stick to a budget that works for you.",
        slug: "budgeting-strategies-for-beginners"
    },
    {
        id: 2,
        title: "The Power of Compound Interest: Start Saving Early",
        excerpt: "Discover how starting to save early can significantly impact your financial future.",
        slug: "power-of-compound-interest"
    },
    {
        id: 3,
        title: "Understanding Credit Scores and Their Impact",
        excerpt: "Learn what factors affect your credit score and how to improve it.",
        slug: "understanding-credit-scores"
    },
    {
        id: 4,
        title: "Keeping Card Details Safe",
        excerpt: "Learn how to keep card details safe during online transactions.",
        slug: "safe-card-details"
    },
]

export default function BlogPostList() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link href={`/financial-literacy/blog/${post.slug}`} className="text-blue-600 hover:underline">
                        Read more
                    </Link>
                </div>
            ))}
        </div>
    )
}

