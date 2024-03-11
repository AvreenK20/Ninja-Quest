class TransitionScreen {
    constructor(game, level, x, y, gameOver, gameWin) {
        Object.assign(this, { game, level, x, y, gameOver, gameWin });

        this.canvas = document.getElementById("gameWorld"); 
        this.context = this.canvas.getContext("2d");

        this.gameStarted = false;
        this.levelType = level;

        this.isTitleScreen = true;
        this.isControlScreen = false;
        this.isLevelsScreen = false;
        this.isCreditsScreen = false;

        // START BUTTON
        this.startButton = {
            width: PARAMS.CANVAS_WIDTH / 4, // Width of the button
            height: 50 // Height of the button
        };

        this.startButton.x = (PARAMS.CANVAS_WIDTH - this.startButton.width) / 2 - this.startButton.width, // Center horizontally
        this.startButton.y = (PARAMS.CANVAS_HEIGHT - this.startButton.height) - 140, // Center vertically

        // CONTROLS BUTTON
        this.controlButton = {
            width: PARAMS.CANVAS_WIDTH / 4, // Width of the button
            height: 50 // Height of the button
        };

        this.controlButton.x = (PARAMS.CANVAS_WIDTH - this.controlButton.width) / 2 + 10, // Center horizontally
        this.controlButton.y = (PARAMS.CANVAS_HEIGHT - this.controlButton.height) - 140, // Center vertically

        // BACK BUTTON

        this.backButton = {
            width: PARAMS.CANVAS_WIDTH / 8, // Width of the button
            height: 50 // Height of the button
        };

        this.backButton.x = this.backButton.width / 4, // Center horizontally
        this.backButton.y = (PARAMS.CANVAS_HEIGHT - this.backButton.height) - 25, // Center vertically
        
        // HOME BUTTON
        this.homeButton = {
            width: PARAMS.CANVAS_WIDTH / 4, // Width of the button
            height: 50 // Height of the button
        };
        
        this.homeButton.x = (PARAMS.CANVAS_WIDTH - this.homeButton.width) / 2, // Center horizontally
        this.homeButton.y = (PARAMS.CANVAS_HEIGHT - this.homeButton.height) - 140, // Center vertically

        // LEVELS BUTTON
        this.levelsButton = {
            width: PARAMS.CANVAS_WIDTH / 4, // Width of the button
            height: 50 // Height of the button
        };
                
        this.levelsButton.x = (PARAMS.CANVAS_WIDTH - this.levelsButton.width) / 2 + this.levelsButton.width + 20, // Center horizontally
        this.levelsButton.y = (PARAMS.CANVAS_HEIGHT - this.levelsButton.height) - 140 // Center vertically


        // CREDITS BUTTON
        this.creditsButton = {
            width: PARAMS.CANVAS_WIDTH / 4, // Width of the button
            height: 50 // Height of the button
        };
                
        this.creditsButton.x = (PARAMS.CANVAS_WIDTH - this.creditsButton.width) / 2 + 10, // Center horizontally
        this.creditsButton.y = (PARAMS.CANVAS_HEIGHT - this.creditsButton.height) - 80 // Center vertically

        // Array to store level buttons
        this.selectLevelButtons = [];

        // Add level buttons to the array (example)
        for (let i = 1; i <= 2; i++) {
            const selectLevelButton = {
                x: 50,
                y: 60 * i,
                width: PARAMS.CANVAS_WIDTH / 4,
                height: 50,
                selectLevelIndex: i // Index of the level corresponding to this button
            };

            this.selectLevelButtons.push(selectLevelButton);
        }

        // EVENT LISTENERS FOR BUTTONS 
        document.getElementById("gameWorld").addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.getElementById("gameWorld").addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.getElementById("gameWorld").addEventListener('click', this.handleMouseClick.bind(this));
    };

    handleMouseDown(event) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Check if the mouse is pressed within the button area
        
        if(this.isTitleScreen) {
            if (!this.startButton.isPressed && mouseX >= this.startButton.x && mouseX <= this.startButton.x + this.startButton.width &&
                mouseY >= this.startButton.y && mouseY <= this.startButton.y + this.startButton.height) {
                this.startButton.isPressed = true;
            }

            if (!this.controlButton.isPressed && mouseX >= this.controlButton.x && mouseX <= this.controlButton.x + this.controlButton.width &&
                mouseY >= this.controlButton.y && mouseY <= this.controlButton.y + this.controlButton.height) {
                this.controlButton.isPressed = true;
            }

            if (!this.levelsButton.isPressed && mouseX >= this.levelsButton.x && mouseX <= this.levelsButton.x + this.levelsButton.width &&
                mouseY >= this.levelsButton.y && mouseY <= this.levelsButton.y + this.levelsButton.height) {
                this.levelsButton.isPressed = true;
            }

            if (!this.creditsButton.isPressed && mouseX >= this.creditsButton.x && mouseX <= this.creditsButton.x + this.creditsButton.width &&
                mouseY >= this.creditsButton.y && mouseY <= this.creditsButton.y + this.creditsButton.height) {
                this.creditsButton.isPressed = true;
            }
        }

        if(this.isControlScreen) {
            if (!this.backButton.isPressed && mouseX >= this.backButton.x && mouseX <= this.backButton.x + this.backButton.width &&
                mouseY >= this.backButton.y && mouseY <= this.backButton.y + this.backButton.height) {
                this.backButton.isPressed = true;
            }
        }

        if(this.isCreditsScreen) {
            if (!this.backButton.isPressed && mouseX >= this.backButton.x && mouseX <= this.backButton.x + this.backButton.width &&
                mouseY >= this.backButton.y && mouseY <= this.backButton.y + this.backButton.height) {
                this.backButton.isPressed = true;
            }
        }

        if(this.isLevelsScreen) {
            if (!this.backButton.isPressed && mouseX >= this.backButton.x && mouseX <= this.backButton.x + this.backButton.width &&
                mouseY >= this.backButton.y && mouseY <= this.backButton.y + this.backButton.height) {
                this.backButton.isPressed = true;
            }

            this.selectLevelButtons.forEach(button => {
                if (mouseX >= button.x && mouseX <= button.x + button.width &&
                    mouseY >= button.y && mouseY <= button.y + button.height) {
                    button.isPressed = true; 
                }
            });
        }

        if(this.gameOver) { 
            if (!this.homeButton.isPressed && mouseX >= this.homeButton.x && mouseX <= this.homeButton.x + this.homeButton.width &&
                mouseY >= this.homeButton.y && mouseY <= this.homeButton.y + this.homeButton.height) {
                this.homeButton.isPressed = true;
            }      
        }

        if(this.gameWin) { 
            if (!this.homeButton.isPressed && mouseX >= this.homeButton.x && mouseX <= this.homeButton.x + this.homeButton.width &&
                mouseY >= this.homeButton.y && mouseY <= this.homeButton.y + this.homeButton.height) {
                this.homeButton.isPressed = true;
            }      
        }
    }

    handleMouseUp(event) {
        // Reset button state when mouse button is released
        if (this.isTitleScreen) {
            this.startButton.isPressed = false;
            this.controlButton.isPressed = false;
            this.levelsButton.isPressed = false;
            this.creditsButton.isPressed = false;
        } else if (this.isControlScreen) {
            this.backButton.isPressed = false;
        } else if (this.isLevelsScreen) {
            this.backButton.isPressed = false;
            this.selectLevelButtons.forEach(button => {
                button.isPressed = false;
            });
        } else if (this.isCreditsScreen) {
            this.backButton,isPressed = false;
        } else if (this.gameOver) {
            this.homeButton.isPressed = false;
        } else if (this.gameWin) {
            this.homeButton.isPressed = false;
        }
    }    

    handleMouseClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if(this.isTitleScreen) {
            // Check if the click is within the start button area
            if (!this.gameStarted && mouseX >= this.startButton.x && mouseX <= this.startButton.x + this.startButton.width &&
                mouseY >= this.startButton.y && mouseY <= this.startButton.y + this.startButton.height) {
                this.gameStarted = true;
                this.game.camera.loadLevel(this.level, this.x, this.y, false, this.gameOver, this.gameWin);
            }

            if (!this.gameStarted && mouseX >= this.controlButton.x && mouseX <= this.controlButton.x + this.controlButton.width &&
                mouseY >= this.controlButton.y && mouseY <= this.controlButton.y + this.controlButton.height) {
                    this.isControlScreen = true;
                    this.isTitleScreen = false;
                    this.isLevelsScreen = false;
                    this.isCreditsScreen = false;
            }

            if (!this.gameStarted && mouseX >= this.levelsButton.x && mouseX <= this.levelsButton.x + this.levelsButton.width &&
                mouseY >= this.levelsButton.y && mouseY <= this.levelsButton.y + this.levelsButton.height) {
                    this.isControlScreen = false;
                    this.isTitleScreen = false;
                    this.isLevelsScreen = true;
                    this.isCreditsScreen = false;

            }

            if (!this.gameStarted && mouseX >= this.creditsButton.x && mouseX <= this.creditsButton.x + this.creditsButton.width &&
                mouseY >= this.creditsButton.y && mouseY <= this.creditsButton.y + this.creditsButton.height) {
                    this.isControlScreen = false;
                    this.isTitleScreen = false;
                    this.isLevelsScreen = false;
                    this.isCreditsScreen = true;
            }
        }

        if(this.isControlScreen) {
            if (!this.gameStarted && mouseX >= this.backButton.x && mouseX <= this.backButton.x + this.backButton.width &&
                mouseY >= this.backButton.y && mouseY <= this.backButton.y + this.backButton.height) {
                    this.isControlScreen = false;
                    this.isLevelsScreen = false; 
                    this.isTitleScreen = true;
                    this.isCreditsScreen = false;
            }
        }

        if(this.isLevelsScreen) {
            if (!this.gameStarted && mouseX >= this.backButton.x && mouseX <= this.backButton.x + this.backButton.width &&
                mouseY >= this.backButton.y && mouseY <= this.backButton.y + this.backButton.height) {
                    this.isControlScreen = false;
                    this.isLevelsScreen = false; 
                    this.isTitleScreen = true;
                    this.isCreditsScreen = false;
            }

            this.selectLevelButtons.forEach(button => {
                if (mouseX >= button.x && mouseX <= button.x + button.width &&
                    mouseY >= button.y && mouseY <= button.y + button.height) {
                        button.isPressed = true;
                        if(button.selectLevelIndex === 1) {
                            this.level = level1;
                        } else if (button.selectLevelIndex === 2) {
                            this.level = level2;
                        }
                } 
            });
            
        }

        if(this.isCreditsScreen) {
            if (!this.gameStarted && mouseX >= this.backButton.x && mouseX <= this.backButton.x + this.backButton.width &&
                mouseY >= this.backButton.y && mouseY <= this.backButton.y + this.backButton.height) {
                    this.isControlScreen = false;
                    this.isLevelsScreen = false; 
                    this.isTitleScreen = true;
                    this.isCreditsScreen = false;
            }
        }

        if (this.gameOver || this.gameWin) {
            if (mouseX >= this.homeButton.x && mouseX <= this.homeButton.x + this.homeButton.width &&
                mouseY >= this.homeButton.y && mouseY <= this.homeButton.y + this.homeButton.height) {
                    window.location.reload(); // Reload the index.html file
            }
        }
    }

    update() { };

    draw(ctx) {
        if (this.gameOver) { // User Dies, Loses the Game
            ctx.fillStyle = "Red";
            ctx.font = "48px Arial";
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/screen/gameover.png"), 0, 0, 1024, 768, 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);

            // Draw the HOME button
           if (this.homeButton.isPressed) {
                // Button pressed state
                ctx.fillStyle = "#135e0a"; // Darker green color                   
                // ctx.fillRect(this.startButton.x + 2, this.startButton.y + 2, this.startButton.width, this.startButton.height);
                ctx.roundRect(this.homeButton.x, this.homeButton.y, this.homeButton.width, this.homeButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                ctx.fill(); // Fill the rounded rectangle with the specified color
            } else {
                // Normal button state
                ctx.fillStyle = "#4CAF50"; // Green color
                // ctx.fillRect(this.startButton.x, this.startButton.y, this.startButton.width, this.startButton.height);
                ctx.roundRect(this.homeButton.x, this.homeButton.y, this.homeButton.width, this.homeButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                ctx.fill(); // Fill the rounded rectangle with the specified color
            }

            // Draw the text
            ctx.fillStyle = "#FFFFFF"; // White color
            ctx.font = "bold 24px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("HOME", this.homeButton.x + this.homeButton.width / 2, this.homeButton.y + this.homeButton.height / 2);      
            
            // DRAW CREDITS BUTTON
        } else if (this.gameWin) { // User Wins the Game 
            ctx.fillStyle = "Orange";
            ctx.font = "48px Arial";
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/screen/gamewin.png"), 0, 0, 1024, 768, 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);

            // Draw the HOME button
           if (this.homeButton.isPressed) {
            // Button pressed state
            ctx.fillStyle = "#135e0a"; // Darker green color                   
            // ctx.fillRect(this.startButton.x + 2, this.startButton.y + 2, this.startButton.width, this.startButton.height);
            ctx.roundRect(this.homeButton.x, this.homeButton.y, this.homeButton.width, this.homeButton.height, 10); // Call the roundRect method to draw the rounded rectangle
            ctx.fill(); // Fill the rounded rectangle with the specified color
            } else {
            // Normal button state
            ctx.fillStyle = "#4CAF50"; // Green color
            // ctx.fillRect(this.startButton.x, this.startButton.y, this.startButton.width, this.startButton.height);
            ctx.roundRect(this.homeButton.x, this.homeButton.y, this.homeButton.width, this.homeButton.height, 10); // Call the roundRect method to draw the rounded rectangle
            ctx.fill(); // Fill the rounded rectangle with the specified color
        }

        // Draw the text
        ctx.fillStyle = "#FFFFFF"; // White color
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("HOME", this.homeButton.x + this.homeButton.width / 2, this.homeButton.y + this.homeButton.height / 2);            
        } else { // Starting game
            if(this.isTitleScreen) {
                ctx.fillStyle = "White";
                ctx.font = "40px Arial";
                ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/screen/welcome.png"), 0, 0, 1024, 768, 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
                ctx.fillStyle = "Black";

                // Draw the START button
                if (this.startButton.isPressed) {
                    // Button pressed state
                    ctx.fillStyle = "#135e0a"; // Darker green color
                    // ctx.fillRect(this.startButton.x + 2, this.startButton.y + 2, this.startButton.width, this.startButton.height);
                    ctx.roundRect(this.startButton.x, this.startButton.y, this.startButton.width, this.startButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                } else {
                    // Normal button state
                    ctx.fillStyle = "#4CAF50"; // Green color
                    // ctx.fillRect(this.startButton.x, this.startButton.y, this.startButton.width, this.startButton.height);
                    ctx.roundRect(this.startButton.x, this.startButton.y, this.startButton.width, this.startButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                }

                // Draw the text
                ctx.fillStyle = "#FFFFFF"; // White color
                ctx.font = "bold 24px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("START", this.startButton.x + this.startButton.width / 2, this.startButton.y + this.startButton.height / 2);

                // Draw the CONTROL button
                if (this.controlButton.isPressed) {
                    // Button pressed state
                    ctx.fillStyle = "#135e0a"; // Darker green color
                    // ctx.fillRect(this.controlButton.x + 2, this.controlButton.y + 2, this.controlButton.width, this.controlButton.height);
                    ctx.roundRect(this.controlButton.x, this.controlButton.y, this.controlButton.width, this.controlButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                } else {
                    // Normal button state
                    ctx.fillStyle = "#4CAF50"; // Green color
                    // ctx.fillRect(this.controlButton.x, this.controlButton.y, this.controlButton.width, this.controlButton.height);
                    ctx.roundRect(this.controlButton.x, this.controlButton.y, this.controlButton.width, this.controlButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                }
                
                // Draw the text
                ctx.fillStyle = "#FFFFFF"; // White color
                ctx.font = "bold 24px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("CONTROLS", this.controlButton.x + this.controlButton.width / 2, this.controlButton.y + this.controlButton.height / 2);

                // Draw the LEVELS button
                if (this.levelsButton.isPressed) {
                    // Button pressed state
                    ctx.fillStyle = "#135e0a"; // Darker green color
                    // ctx.fillRect(this.controlButton.x + 2, this.controlButton.y + 2, this.controlButton.width, this.controlButton.height);
                    ctx.roundRect(this.levelsButton.x, this.levelsButton.y, this.levelsButton.width, this.levelsButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                } else {
                    // Normal button state
                    ctx.fillStyle = "#4CAF50"; // Green color
                    // ctx.fillRect(this.controlButton.x, this.controlButton.y, this.controlButton.width, this.controlButton.height);
                    ctx.roundRect(this.levelsButton.x, this.levelsButton.y, this.levelsButton.width, this.levelsButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                }
                
                // Draw the text
                ctx.fillStyle = "#FFFFFF"; // White color
                ctx.font = "bold 24px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("LEVELS", this.levelsButton.x + this.levelsButton.width / 2, this.levelsButton.y + this.levelsButton.height / 2);

                // Draw the CREDITS button
                if (this.creditsButton.isPressed) {
                    // Button pressed state
                    ctx.fillStyle = "#135e0a"; // Darker green color
                    // ctx.fillRect(this.controlButton.x + 2, this.controlButton.y + 2, this.controlButton.width, this.controlButton.height);
                    ctx.roundRect(this.creditsButton.x, this.creditsButton.y, this.creditsButton.width, this.creditsButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                } else {
                    // Normal button state
                    ctx.fillStyle = "#4CAF50"; // Green color
                    // ctx.fillRect(this.controlButton.x, this.controlButton.y, this.controlButton.width, this.controlButton.height);
                    ctx.roundRect(this.creditsButton.x, this.creditsButton.y, this.creditsButton.width, this.creditsButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                }
                
                // Draw the text
                ctx.fillStyle = "#FFFFFF"; // White color
                ctx.font = "bold 24px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("CREDITS", this.creditsButton.x + this.creditsButton.width / 2, this.creditsButton.y + this.creditsButton.height / 2);
            }

            if(this.isControlScreen) {
                ctx.fillStyle = 'rgba(0, 200, 255, 0.5)'; // Magenta with 50% opacity
                ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT); // Draw a rectangle covering the entire canvas

                // Draw the BACK button
                if (this.backButton.isPressed) {
                    // Button pressed state
                    ctx.fillStyle = "#135e0a"; // Darker green color
                    // ctx.fillRect(this.backButton.x + 2, this.backButton.y + 2, this.backButton.width, this.backButton.height);
                    ctx.roundRect(this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                } else {
                    // Normal button state
                    ctx.fillStyle = "#4CAF50"; // Green color
                    // ctx.fillRect(this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height);
                    ctx.roundRect(this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                }

                // Draw the text
                ctx.fillStyle = "#FFFFFF"; // White color
                ctx.font = "bold 24px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("BACK", this.backButton.x + this.backButton.width / 2, this.backButton.y + this.backButton.height / 2);

                // Draw the Controls 
                ctx.fillStyle = "Black";
                ctx.font = "bold 32px Arial";
                ctx.textAlign = "center";
                ctx.textBaseLine = "middle";
                ctx.fillText("GAME CONTROLS", PARAMS.CANVAS_WIDTH / 2, 100);

                ctx.font = "bold 20px Arial";
                ctx.textAlign = "left";
                ctx.textBaseLine = "left";
                ctx.fillText("WASD - Move Up, Left, Right, Crouch", 50, PARAMS.CANVAS_HEIGHT / 4);
                ctx.fillText("P - Punch", 50, PARAMS.CANVAS_HEIGHT / 4 + 50);
                ctx.fillText("O - Throw Shuriken the direction you are facing", 50, PARAMS.CANVAS_HEIGHT / 4 + 100);
                ctx.fillText("Left-Click - Throw Kunai towards mouse", 50, PARAMS.CANVAS_HEIGHT / 4 + 150);
                ctx.fillText("Military Pills - Health +1", 50, PARAMS.CANVAS_HEIGHT / 4 + 200);

                }
            }

            if (this.isLevelsScreen) {
                ctx.fillStyle = 'rgba(128, 0, 128, 0.5)'; // Purple with 50% opacity
                ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT); // Draw a rectangle covering the entire canvas

                // Draw the BACK button
                if (this.backButton.isPressed) {
                    // Button pressed state
                    ctx.fillStyle = "#135e0a"; // Darker green color
                    // ctx.fillRect(this.backButton.x + 2, this.backButton.y + 2, this.backButton.width, this.backButton.height);
                    ctx.roundRect(this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                } else {
                    // Normal button state
                    ctx.fillStyle = "#4CAF50"; // Green color
                    // ctx.fillRect(this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height);
                    ctx.roundRect(this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                }

                // Draw the text
                ctx.fillStyle = "#FFFFFF"; // White color
                ctx.font = "bold 24px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("BACK", this.backButton.x + this.backButton.width / 2, this.backButton.y + this.backButton.height / 2);

                this.selectLevelButtons.forEach(button => {
                    // Draw button
                    if (button.isPressed) {
                        ctx.fillStyle = "#135e0a"; // Darker green color
                    } else {
                        ctx.fillStyle = "#4CAF50"; // Green color
                    }
                    ctx.fillRect(button.x, button.y, button.width, button.height);
    
                    // Draw text
                    ctx.fillStyle = "#FFFFFF"; // White color
                    ctx.font = "bold 24px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("level " + (button.selectLevelIndex), button.x + button.width / 2, button.y + button.height / 2);
                });
            }

            if(this.isCreditsScreen) {
                ctx.fillStyle = 'rgba(255, 100, 50, 0.2)'; // Magenta with 50% opacity
                ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT); // Draw a rectangle covering the entire canvas

                // Draw the BACK button
                if (this.backButton.isPressed) {
                    // Button pressed state
                    ctx.fillStyle = "#135e0a"; // Darker green color
                    // ctx.fillRect(this.backButton.x + 2, this.backButton.y + 2, this.backButton.width, this.backButton.height);
                    ctx.roundRect(this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                } else {
                    // Normal button state
                    ctx.fillStyle = "#4CAF50"; // Green color
                    // ctx.fillRect(this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height);
                    ctx.roundRect(this.backButton.x, this.backButton.y, this.backButton.width, this.backButton.height, 10); // Call the roundRect method to draw the rounded rectangle
                    ctx.fill(); // Fill the rounded rectangle with the specified color
                }

                // Draw the text
                ctx.fillStyle = "#FFFFFF"; // White color
                ctx.font = "bold 24px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("BACK", this.backButton.x + this.backButton.width / 2, this.backButton.y + this.backButton.height / 2);

                // Draw the Controls 
                ctx.fillStyle = "Black";
                ctx.font = "bold 32px Arial";
                ctx.textAlign = "center";
                ctx.textBaseLine = "middle";
                ctx.fillText("CREDITS", PARAMS.CANVAS_WIDTH / 2, 100);

                ctx.font = "bold 24px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "left";
                let lineHeight = 20; // Adjust the line height as needed
                let lineSpacing = 5; // Adjust the spacing between lines as needed
                let startX = 50;
                let startY = 175;
                for (let i = 0; i < credits.text.length; i++) {
                    let text = credits.text[i];
                    let y = startY + i * (lineHeight + lineSpacing);
                    ctx.fillText(text, startX, y);
                }
            }
        }
    };

    // Add a method to CanvasRenderingContext2D prototype for drawing rounded rectangles
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        this.beginPath();
        this.moveTo(x + radius, y);
        this.arcTo(x + width, y, x + width, y + height, radius);
        this.arcTo(x + width, y + height, x, y + height, radius);
        this.arcTo(x, y + height, x, y, radius);
        this.arcTo(x, y, x + width, y, radius);
        this.closePath();
    };
