import { Router } from 'express';

export interface AppRouter {
  public: Router;
  private: Router;
}
