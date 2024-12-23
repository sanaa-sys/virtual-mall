
import BlogPostList from './components/BlogPostList'
import SavingsCalculator from './components/SavingsCalculator'
import CreditCardCalculator from './components/CreditCardCalculator'
import ExpenseBreakdownCalculator from './components/ExpenseBreakdownCalculator'
import ShoppingBudgetCalculator from './components/ShoppingBudgetCalculator'
import ContactForm from './components/ContactForm'
import MonthlyBudgetManager from './components/MonthlyBudgetManager'


export default function FinancialLiteracyPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Financial Literacy Center</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
                <BlogPostList />
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Financial Calculators</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Monthly Budget Manager</h3>
                        <MonthlyBudgetManager />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Savings Goal Calculator</h3>
                        <SavingsCalculator />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Credit Card Interest Calculator</h3>
                        <CreditCardCalculator />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Expense Breakdown Calculator</h3>
                        <ExpenseBreakdownCalculator />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Shopping Budget Calculator</h3>
                        <ShoppingBudgetCalculator />
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Need More Financial Advice?</h2>
                <ContactForm />
            </section>
        </div>
    )
}

