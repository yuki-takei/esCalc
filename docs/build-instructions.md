Build Instructions
===================

Requirements
-------------

* Node.js  
  (confirmed to work with v4.4.2)


Instructions
------------

1. Clone the repository:

1. Install global packages:

  ```sh
  npm install -g gulp jspm dtsm mocha
  ```

1. Install Dependencies:

  ```sh
  npm install
  jspm install
  dtsm install
  ```

1. Build:

  ```sh
  gulp package
  ```

  This will create the esCalc application at `release`.
