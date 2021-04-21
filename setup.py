from setuptools import setup, find_packages

setup(
    name="bard",
    version="3.9.11",
    description="Packaging a Flask application",
    long_description="",
    classifiers=[
        "Intended Audience :: Developers",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
    ],
    keywords="",
    author="Mathias Darr",
    author_email="dakobedbard@gmail.com",
    url="https://github.com/MathiasDarr/dakobed_flask",
    license="MIT",
    packages=find_packages(exclude=["ez_setup", "examples", "test"]),
    namespace_packages=[],
    include_package_data=True,
    zip_safe=False,
    install_requires=[],
    test_suite="nose.collector",
    entry_points={
        "bard.init": [],
        "bard.task_handlers": [
            "index = bard.task_handlers:op_index_handler",
        ],
        "console_scripts": ["bard = bard.manage:cli"],
    },
    tests_require=["coverage", "nose"],
)

