import { ArrowLeft, TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProjectProps {
  onBack: () => void;
}

export function DashboardProject({ onBack }: DashboardProjectProps) {
  const salesData = [
    { name: 'Jan', ventes: 4000, revenus: 2400, clients: 240 },
    { name: 'Fév', ventes: 3000, revenus: 1398, clients: 221 },
    { name: 'Mar', ventes: 2000, revenus: 9800, clients: 229 },
    { name: 'Avr', ventes: 2780, revenus: 3908, clients: 200 },
    { name: 'Mai', ventes: 1890, revenus: 4800, clients: 218 },
    { name: 'Juin', ventes: 2390, revenus: 3800, clients: 250 },
    { name: 'Juil', ventes: 3490, revenus: 4300, clients: 210 },
  ];

  const categoryData = [
    { name: 'Électronique', value: 400 },
    { name: 'Vêtements', value: 300 },
    { name: 'Maison', value: 200 },
    { name: 'Sports', value: 150 },
    { name: 'Livres', value: 100 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const stats = [
    {
      icon: DollarSign,
      label: 'Revenus totaux',
      value: '€125,430',
      change: '+12.5%',
      isPositive: true,
      color: 'bg-blue-500'
    },
    {
      icon: ShoppingCart,
      label: 'Commandes',
      value: '1,429',
      change: '+8.2%',
      isPositive: true,
      color: 'bg-green-500'
    },
    {
      icon: Users,
      label: 'Nouveaux clients',
      value: '342',
      change: '+23.1%',
      isPositive: true,
      color: 'bg-purple-500'
    },
    {
      icon: Activity,
      label: 'Taux de conversion',
      value: '3.2%',
      change: '-2.4%',
      isPositive: false,
      color: 'bg-orange-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Analytique</h1>
              <p className="text-gray-600">Vue d'ensemble de vos performances</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Area Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Évolution des ventes</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="ventes" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ventes par catégorie</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Revenus mensuels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenus" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Acquisition de clients</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="clients" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Activité récente</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { client: 'Marie Dubois', action: 'Nouvelle commande', montant: '€234.50', time: 'Il y a 5 min' },
              { client: 'Pierre Martin', action: 'Nouveau compte créé', montant: '-', time: 'Il y a 12 min' },
              { client: 'Sophie Laurent', action: 'Commande livrée', montant: '€567.80', time: 'Il y a 1h' },
              { client: 'Thomas Rousseau', action: 'Paiement reçu', montant: '€892.00', time: 'Il y a 2h' },
              { client: 'Julie Bernard', action: 'Nouvelle commande', montant: '€123.45', time: 'Il y a 3h' },
            ].map((activity, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">{activity.client[0]}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{activity.client}</div>
                      <div className="text-sm text-gray-600">{activity.action}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{activity.montant}</div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}