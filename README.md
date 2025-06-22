# Decentralized Business Intelligence Data Warehouse Management

A comprehensive decentralized system for managing business intelligence data warehouses using Clarity smart contracts on the Stacks blockchain.

## Overview

This system provides a decentralized approach to BI data warehouse management with the following key components:

- **BI Manager Verification**: Manages authorization and verification of business intelligence managers
- **Data Integration**: Handles integration of various business data sources
- **Warehouse Management**: Manages data warehouse operations and storage
- **Query Optimization**: Optimizes data queries and manages execution plans
- **Performance Monitoring**: Monitors system performance and generates alerts

## Architecture

### Smart Contracts

1. **bi-manager-verification.clar**
    - Verifies and manages BI manager permissions
    - Controls access to other system components
    - Manages role-based permissions

2. **data-integration.clar**
    - Registers and manages data sources
    - Handles data source schemas
    - Tracks synchronization status

3. **warehouse-management.clar**
    - Creates and manages warehouse tables
    - Tracks storage usage and limits
    - Manages table partitions

4. **query-optimization.clar**
    - Creates optimized query execution plans
    - Manages query result caching
    - Tracks query performance metrics

5. **performance-monitoring.clar**
    - Monitors system performance metrics
    - Logs performance events
    - Generates alerts based on thresholds

## Features

### Manager Verification
- Verify BI managers with proper authorization
- Set granular permissions for different operations
- Revoke access when needed

### Data Source Management
- Register multiple data sources with different types
- Track connection status and last synchronization
- Define and manage data schemas

### Warehouse Operations
- Create and manage warehouse tables
- Monitor storage usage with limits
- Partition management for large datasets

### Query Optimization
- Create optimized execution plans
- Cache frequently used query results
- Track query performance over time

### Performance Monitoring
- Real-time system metrics tracking
- Configurable alert thresholds
- Comprehensive performance logging

## Usage

### 1. Verify a BI Manager

\`\`\`clarity
(contract-call? .bi-manager-verification verify-manager 'SP1234567890)
\`\`\`

### 2. Register a Data Source

\`\`\`clarity
(contract-call? .data-integration register-data-source
"sales-db"
"postgresql"
"postgresql://host:port/database")
\`\`\`

### 3. Create a Warehouse Table

\`\`\`clarity
(contract-call? .warehouse-management create-table
"sales-fact"
"fact-table"
u50000)
\`\`\`

### 4. Create Query Plan

\`\`\`clarity
(contract-call? .query-optimization create-query-plan
"monthly-sales-report"
0x1234567890abcdef
u1000
u3)
\`\`\`

### 5. Monitor Performance

\`\`\`clarity
(contract-call? .performance-monitoring init-metric
"query-response-time"
"latency"
u5000)
\`\`\`

## Security Features

- Role-based access control through manager verification
- Storage limits to prevent resource exhaustion
- Permission checks on all critical operations
- Audit trail through performance logging

## Storage Limits

- Maximum warehouse storage: 1,000,000 units
- Maximum 10 partitions per table
- Maximum 20 schema fields per data source
- Maximum 10 permissions per manager

## Error Codes

- 100-199: Manager verification errors
- 200-299: Data integration errors
- 300-399: Warehouse management errors
- 400-499: Query optimization errors
- 500-599: Performance monitoring errors

## Development

### Prerequisites
- Clarity CLI
- Stacks blockchain testnet access
- Vitest for testing

### Testing
Run the test suite:
\`\`\`bash
npm test
\`\`\`

### Deployment
Deploy contracts to testnet:
\`\`\`bash
clarinet deploy --testnet
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details

