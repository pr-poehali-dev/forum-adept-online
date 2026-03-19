import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ThreadPage from "./pages/ThreadPage";
import ProfilePage from "./pages/ProfilePage";
import MessagesPage from "./pages/MessagesPage";
import SearchPage from "./pages/SearchPage";
import AdminPage from "./pages/AdminPage";
import NewThreadPage from "./pages/NewThreadPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/category/:id" element={<Layout><CategoryPage /></Layout>} />
          <Route path="/thread/:id" element={<Layout><ThreadPage /></Layout>} />
          <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
          <Route path="/messages" element={<Layout><MessagesPage /></Layout>} />
          <Route path="/search" element={<Layout><SearchPage /></Layout>} />
          <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
          <Route path="/new-thread" element={<Layout><NewThreadPage /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
