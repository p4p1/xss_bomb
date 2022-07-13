#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Made by papi
# Created on: Wed 13 Jul 2022 02:20:28 AM BST
# xss_bomb.py
# Description:

from burp import IBurpExtender

class BurpExtender(IBurpExtender):
    def registerExtenderCallbacks(self, callbacks):
        print("Hello World")
        return
