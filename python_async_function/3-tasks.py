#!/usr/bin/env python3
"""Module to define a task that waits for a random delay"""

import asyncio

wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int) -> asyncio.Task:
    """Create a task that waits for a random delay"""
    return asyncio.create_task(wait_random(max_delay))
