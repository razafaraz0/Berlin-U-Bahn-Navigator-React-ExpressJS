## Getting Started (See My Comments Below)

### Backend

In the directory `backend_ubahn` you'll find a Node.js application with an Express server ready to be used.

```sh
# enter directory
cd backend_ubahn

# install node modules
npm ci

# run server
npm start
```

To check if the server works, you can query a dummy endpoint:

```sh
curl http://localhost:8080/hello
# -> Hello World"
```

### Frontend

```sh
# enter directory
cd frontend_ubahn

# install node modules
npm ci

# run server and bundler
npm start
```

Open `http://localhost:3000/` in your web browser. It should show a welcome message and fetched data from the backend.


# ------- My Comments ---------

I found the project both interesting and enjoyable, completing it within 4.5 hours. The project was not too ambiguous and was quite reasonable. The requirements were fairly straightforward, and where there were uncertainties about specific criteria, the test files provided a clear understanding of what was expected.

### Frontend Enhancements:

Given additional time, I would focus on the following improvements:

- Testing: Expand Jest test coverage to ensure all components and hooks are thoroughly validated.
- State Management: Transition to TanStack (formerly React Query) to leverage advanced data-fetching capabilities such as efficient caching, background updates, and automatic retries.
- User Experience: Introduce a loading indicator to provide immediate feedback during data fetching, enhancing - the user interaction and smoothness of the UI.
- Performance Optimization: Implement a more sophisticated list management solution, like a virtualized list, to efficiently handle large datasets while maintaining high performance and responsiveness.

### Backend Enhancements:

For the backend, if afforded more time, my priorities would include:

- Algorithm Optimization: For task Q4, while initially considering a randomized approach for route discovery, I opted for a more optimal Breadth-First Search (BFS) algorithm to establish connectivity. However, due to time constraints, the potential for identifying the most efficient route was not fully explored.
  Middleware Robustness: Incorporate additional middleware to address edge cases, such as validation for incorrect stationName inputs and other user errors.
- Comprehensive Testing: Increase the scope and depth of tests to rigorously cover all functional aspects of the application.
- Error Handling: Further refine the global error handling mechanism to ensure API responses are consistently detailed and helpful for front-end consumption.

### Challenges Overcome:

- Test Framework Setup: The initial setup of Jest required a notable amount of effort, which was essential for the subsequent development and testing process.
- Project Initialization: There were challenges in compiling the project on my Windows PC, which necessitated some setup adjustments to achieve a functional development environment.
