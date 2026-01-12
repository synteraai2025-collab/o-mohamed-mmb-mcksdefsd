'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import * as Dialog from '@radix-ui/react-dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Command } from '@/components/ui/command';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Plus, Search, Filter, ChevronRight, ArrowLeft, ArrowRight, BarChart3, TrendingUp, Users, Activity } from 'lucide-react';

interface Metric {
  id: number;
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

const mockMetrics: Metric[] = [
  { id: 1, name: 'Page Views', value: '45,234', change: '+12.5%', trend: 'up' },
  { id: 2, name: 'Unique Visitors', value: '12,876', change: '+8.2%', trend: 'up' },
  { id: 3, name: 'Bounce Rate', value: '34.2%', change: '-2.1%', trend: 'down' },
  { id: 4, name: 'Avg Session', value: '3m 24s', change: '+15.3%', trend: 'up' }
];

const AnalyticsDashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMetrics, setFilteredMetrics] = useState<Metric[]>(mockMetrics);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setFilteredMetrics(mockMetrics);
      } catch (err) {
        setError('Failed to load analytics data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = mockMetrics.filter((metric) =>
      metric.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMetrics(results);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredMetrics.length / 5);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='bg-gradient-to-tl from-indigo-500 via-peach-300 to-white min-h-screen text-gray-900'>
      <header className='p-4 flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Analytics Dashboard</h1>
        <div className='flex space-x-2'>
          <Button variant='outline'>Export Report</Button>
          <Button onClick={() => setModalOpen(true)}>Add Metric</Button>
        </div>
      </header>

      <main className='p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <Card className='shadow-xl rounded-2xl overflow-hidden bg-gradient-to-tl from-indigo-600 via-peach-300 to-indigo-400 animate-morph'>
          <CardHeader className='p-6'>
            <CardTitle className='text-white'>Page Views</CardTitle>
          </CardHeader>
          <CardContent className='text-center py-6'>
            <span className='text-4xl font-bold text-white'>45,234</span>
            <div className='flex items-center justify-center mt-2 text-white'>
              <TrendingUp className='w-4 h-4 mr-1' />
              <span className='text-sm'>+12.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-xl rounded-2xl overflow-hidden bg-gradient-to-tl from-indigo-600 via-peach-300 to-indigo-400 animate-morph'>
          <CardHeader className='p-6'>
            <CardTitle className='text-white'>Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent className='text-center py-6'>
            <span className='text-4xl font-bold text-white'>12,876</span>
            <div className='flex items-center justify-center mt-2 text-white'>
              <TrendingUp className='w-4 h-4 mr-1' />
              <span className='text-sm'>+8.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-xl rounded-2xl overflow-hidden bg-gradient-to-tl from-indigo-600 via-peach-300 to-indigo-400 animate-morph'>
          <CardHeader className='p-6'>
            <CardTitle className='text-white'>Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent className='text-center py-6'>
            <span className='text-4xl font-bold text-white'>34.2%</span>
            <div className='flex items-center justify-center mt-2 text-white'>
              <TrendingUp className='w-4 h-4 mr-1 rotate-180' />
              <span className='text-sm'>-2.1%</span>
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-xl rounded-2xl overflow-hidden bg-gradient-to-tl from-indigo-600 via-peach-300 to-indigo-400 animate-morph'>
          <CardHeader className='p-6'>
            <CardTitle className='text-white'>Avg Session</CardTitle>
          </CardHeader>
          <CardContent className='text-center py-6'>
            <span className='text-4xl font-bold text-white'>3m 24s</span>
            <div className='flex items-center justify-center mt-2 text-white'>
              <TrendingUp className='w-4 h-4 mr-1' />
              <span className='text-sm'>+15.3%</span>
            </div>
          </CardContent>
        </Card>

        <Card className='col-span-full shadow-xl rounded-2xl overflow-hidden bg-white'>
          <CardHeader className='p-6'>
            <CardTitle>Key Metrics Overview</CardTitle>
          </CardHeader>
          <CardContent className='p-6'>
            {isLoading ? (
              <Skeleton className='h-20 w-full' />
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMetrics.slice((currentPage - 1) * 5, currentPage * 5).map((metric) => (
                    <TableRow key={metric.id}>
                      <TableCell className='font-medium'>{metric.name}</TableCell>
                      <TableCell>{metric.value}</TableCell>
                      <TableCell>
                        <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'}>
                          {metric.change}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {metric.trend === 'up' ? (
                          <TrendingUp className='w-4 h-4 text-green-600' />
                        ) : (
                          <TrendingUp className='w-4 h-4 text-red-600 rotate-180' />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <div className='mt-4 flex justify-end space-x-2'>
              <Button variant='outline' disabled={currentPage === 1} onClick={handlePrevPage}>Previous</Button>
              <Button variant='outline' disabled={currentPage === totalPages} onClick={handleNextPage}>Next</Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Dialog.Root open={isModalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 z-50 bg-black opacity-50' />
          <Dialog.Content className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-lg w-full p-6 shadow-xl rounded-2xl bg-white'>
            <Dialog.Title className='text-2xl font-bold'>Add New Metric</Dialog.Title>
            <form className='space-y-4 mt-4'>
              <Input placeholder='Metric Name' required />
              <Input placeholder='Current Value' required />
              <Input placeholder='Change Percentage' required />
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Trend Direction' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='up'>Increasing</SelectItem>
                  <SelectItem value='down'>Decreasing</SelectItem>
                  <SelectItem value='neutral'>Neutral</SelectItem>
                </SelectContent>
              </Select>
              <Button type='submit' className='w-full'>Add Metric</Button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <footer className='p-4 text-center'>
        <p>&copy; 2023 Analytics Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AnalyticsDashboard;
