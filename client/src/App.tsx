import { Switch, Route, useRoute } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "sonner";
import { WhopProvider } from "@/context/WhopContext";
import Home from "@/pages/home";
import Compatibility from "@/pages/compatibility";
import Cues from "@/pages/cues";
import Explore from "@/pages/explore";
import CueChats from "@/pages/cuechats";
import Learn from "@/pages/learn";
import NumberDetailPage from "@/pages/number-detail";
import Course from "@/pages/course";
import Lesson from "@/pages/lesson";
import NotFound from "@/pages/not-found";

function ExperienceView() {
  const [, params] = useRoute("/experiences/:experienceId/*?");
  const experienceId = params?.experienceId;

  return (
    <WhopProvider experienceId={experienceId}>
      <div className="min-h-screen bg-background" data-experience-id={experienceId}>
        <Switch>
          <Route path="/experiences/:experienceId" component={Home} />
          <Route path="/experiences/:experienceId/compatibility" component={Compatibility} />
          <Route path="/experiences/:experienceId/cues" component={Cues} />
          <Route path="/experiences/:experienceId/explore" component={Explore} />
          <Route path="/experiences/:experienceId/cuechats" component={CueChats} />
          <Route path="/experiences/:experienceId/learn" component={Learn} />
          <Route path="/experiences/:experienceId/course/:courseId" component={Course} />
          <Route path="/experiences/:experienceId/learn/:courseId/:lessonId" component={Lesson} />
          <Route path="/experiences/:experienceId/number/:type/:number" component={NumberDetailPage} />
          <Route component={Home} />
        </Switch>
      </div>
    </WhopProvider>
  );
}

function DashboardView() {
  const [, params] = useRoute("/dashboard/:companyId/*?");
  const companyId = params?.companyId;

  return (
    <WhopProvider companyId={companyId}>
      <div className="min-h-screen bg-background" data-company-id={companyId}>
        <Switch>
          <Route path="/dashboard/:companyId" component={Home} />
          <Route path="/dashboard/:companyId/compatibility" component={Compatibility} />
          <Route path="/dashboard/:companyId/cues" component={Cues} />
          <Route path="/dashboard/:companyId/explore" component={Explore} />
          <Route path="/dashboard/:companyId/cuechats" component={CueChats} />
          <Route path="/dashboard/:companyId/learn" component={Learn} />
          <Route path="/dashboard/:companyId/course/:courseId" component={Course} />
          <Route path="/dashboard/:companyId/learn/:courseId/:lessonId" component={Lesson} />
          <Route path="/dashboard/:companyId/number/:type/:number" component={NumberDetailPage} />
          <Route component={Home} />
        </Switch>
      </div>
    </WhopProvider>
  );
}

function StandaloneView() {
  return (
    <WhopProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/compatibility" component={Compatibility} />
        <Route path="/cues" component={Cues} />
        <Route path="/explore" component={Explore} />
        <Route path="/cuechats" component={CueChats} />
        <Route path="/learn" component={Learn} />
        <Route path="/course/:courseId" component={Course} />
        <Route path="/learn/:courseId/:lessonId" component={Lesson} />
        <Route path="/number/:type/:number" component={NumberDetailPage} />
        <Route component={NotFound} />
      </Switch>
    </WhopProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/experiences/:experienceId/*?" component={ExperienceView} />
      <Route path="/dashboard/:companyId/*?" component={DashboardView} />
      <Route component={StandaloneView} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark min-h-screen bg-background">
          <Router />
        </div>
        <Toaster />
        <Sonner position="top-right" theme="dark" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
