import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// This would typically come from a database or CMS
const blogPosts = {
    "budgeting-strategies-for-beginners": {
        title: "5 Effective Budgeting Strategies for Beginners",
        content: `
      <p>Creating and sticking to a budget is a crucial step in managing your finances. Here are five effective strategies to get you started:</p>
      <ol>
        <li><strong>Track your spending:</strong> Keep a record of all your expenses for a month to understand your spending habits.</li>
        <li><strong>Categorize your expenses:</strong> Divide your spending into categories like housing, food, transportation, etc.</li>
        <li><strong>Use the 50/30/20 rule:</strong> Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.</li>
        <li><strong>Try the envelope system:</strong> Use cash envelopes for different spending categories to limit overspending.</li>
        <li><strong>Regularly review and adjust:</strong> Review your budget monthly and make adjustments as needed.</li>
      </ol>
      <p>Remember, the key to successful budgeting is consistency and honesty with yourself about your spending habits.</p>
    `
    },
    "power-of-compound-interest": {
        title: "The Power of Compound Interest: Start Saving Early",
        content: `
      <p>Compound interest is often called the eighth wonder of the world. Here's why starting early can make a huge difference:</p>
      <ul>
        <li><strong>What is compound interest?</strong> It's the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest.</li>
        <li><strong>Why start early?</strong> The earlier you start saving, the more time your money has to grow exponentially.</li>
        <li><strong>Example:</strong> Investing $100 per month at an annual return of 7% can grow to over $120,000 in 30 years.</li>
      </ul>
      <p>Remember, time is your greatest asset when it comes to building wealth through compound interest.</p>
    `
    },
    "understanding-credit-scores": {
        title: "Understanding Credit Scores and Their Impact",
        content: `
      <p>Your credit score is more than just a number; it's a key factor in your financial health. Here's what you need to know:</p>
      <ul>
        <li><strong>What is a credit score?</strong> A numerical representation of your creditworthiness, usually ranging from 300 to 850.</li>
        <li><strong>Why does it matter?</strong> It impacts your ability to secure loans, credit cards, and even rental agreements.</li>
        <li><strong>How to improve it:</strong>
          <ul>
            <li>Pay your bills on time.</li>
            <li>Keep your credit utilization low.</li>
            <li>Avoid opening too many accounts at once.</li>
          </ul>
        </li>
      </ul>
      <p>Monitoring your credit score regularly can help you make informed financial decisions and achieve your goals.</p>
    `
    },
    "safe-card-details": {
        title: "Keeping Card Details Safe",
        content: `
      <p>With the rise of online shopping, protecting your card details is more important than ever. Here's how you can stay safe:</p>
      <ul>
        <li><strong>Use secure websites:</strong> Ensure the URL starts with <code>https://</code> and look for a padlock icon.</li>
        <li><strong>Enable two-factor authentication:</strong> Add an extra layer of security to your accounts.</li>
        <li><strong>Avoid public Wi-Fi:</strong> Don't enter sensitive information while connected to unsecured networks.</li>
        <li><strong>Monitor your statements:</strong> Regularly check for unauthorized transactions.</li>
        <li><strong>Use virtual cards:</strong> Some banks offer virtual cards for online purchases, adding an extra layer of security.</li>
      </ul>
      <p>By following these tips, you can reduce the risk of fraud and keep your financial information secure.</p>
    `
    }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = blogPosts[params.slug];
    if (!post) {
        return {
            title: 'Blog Post Not Found'
        };
    }
    return {
        title: `${post.title} | Financial Literacy Blog`
    };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = blogPosts[params.slug];

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
            <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: post.content }} />
            <div className="mt-8">
                <Link href="/financial-literacy" className="text-blue-600 hover:underline">
                    ← Back to Financial Literacy Center
                </Link>
            </div>
        </div>
    );
}

