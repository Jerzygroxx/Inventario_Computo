import Navbar from './components/Navbar';
import EquiposPage from './pages/EquiposPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EquiposPage />
      </main>
    </div>
  );
}

export default App;
