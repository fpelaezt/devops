import pygame
import os
from settings import Settings

class Ship():
    def __init__(self, screen):
        """Initialize the ship and set its starting position."""
        self.screen = screen
        # Load the ship image and get its rect.
        self.base_dir = os.path.abspath(os.path.dirname(__file__))
        self.ship_file_name = os.path.join(self.base_dir, "images", "ship.bmp")
        self.image = pygame.image.load(self.ship_file_name)
        self.rect = self.image.get_rect()
        self.screen_rect = screen.get_rect()
        # Start each new ship at the bottom center of the screen.
        self.rect.centerx = self.screen_rect.centerx
        self.rect.bottom = self.screen_rect.bottom
        # Movement flag
        self.moving_right = False
        self.moving_left = False
        # Maximum
        ai_settings = Settings()
        self.max_right = ai_settings.screen_width
        
    def blitme(self):
        """Draw the ship at its current location."""
        self.screen.blit(self.image, self.rect)

    def update(self):
        """Update the ship's position based on the movement flag."""
        if self.moving_right:
            if (self.rect.centerx < self.max_right):
                self.rect.centerx += 1
        if self.moving_left:
            self.rect.centerx -= 1