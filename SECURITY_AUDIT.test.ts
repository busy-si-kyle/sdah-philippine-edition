import { expect, it, describe } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Security Audit Report', () => {
  it('should exist in the project root', () => {
    const reportPath = path.join(process.cwd(), 'SECURITY_AUDIT.md');
    expect(fs.existsSync(reportPath)).toBe(true);
  });

  it('should contain the npm audit summary', () => {
    const reportPath = path.join(process.cwd(), 'SECURITY_AUDIT.md');
    const content = fs.readFileSync(reportPath, 'utf8');
    expect(content).toContain('## Dependency Analysis');
    expect(content).toContain('npm audit');
  });
});
