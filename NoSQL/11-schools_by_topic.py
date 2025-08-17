#!/usr/bin/env python3
"""Module to find schools by topic"""


def schools_by_topic(mongo_collection, topic):
    """Finds and returns schools having a specific topic"""
    return list(mongo_collection.find({"topics": topic}))
