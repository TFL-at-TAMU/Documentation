import os
from urllib.parse import quote

# --- CONFIGURATION ---
DOCS_DIR = 'docs'
SIDEBAR_FILE = os.path.join(DOCS_DIR, '_sidebar.md')
HOMEPAGE = 'The Fab Lab README.md'

# Files and directories to completely hide from the sidebar navigation
EXCLUDE_DIRS = {'assets', 'images', '.git', '.github'}
EXCLUDE_FILES = {'_sidebar.md', '_coverpage.md', 'index.html', HOMEPAGE, '.nojekyll'}

def generate_sidebar_content(current_dir, base_dir, indent_level=0):
    """
    Recursively scans a directory and returns a list of Markdown formatted sidebar entries.
    Future Maintainers: This function builds the navigation tree by looking at the folder structure.
    """
    lines = []
    
    # Try to list the directory; if it fails, safely return empty lines
    try:
        items = sorted(os.listdir(current_dir))
    except FileNotFoundError:
        return lines

    for item in items:
        path = os.path.join(current_dir, item)
        
        # Skip hidden files/directories (like .DS_Store, .git)
        if item.startswith('.'):
            continue
            
        if os.path.isdir(path):
            if item in EXCLUDE_DIRS:
                continue
            
            # Add directory as a section header (e.g. bold text, unlinked)
            indent = '  ' * indent_level
            lines.append(f"{indent}- **{item}**")
            
            # Recursively process the contents of the nested directory
            nested_lines = generate_sidebar_content(path, base_dir, indent_level + 1)
            lines.extend(nested_lines)
            
        elif os.path.isfile(path) and item.endswith('.md'):
            # Don't include excluded files at the root level
            if item in EXCLUDE_FILES and indent_level == 0:
                continue
            
            # Format the link to work with Docsify routing
            # Docsify expects paths relative to the docs directory
            rel_path = os.path.relpath(path, base_dir)
            
            # Remove the '.md' extension to create a clean display name
            display_name = item[:-3]
            
            # Ensure path separators are forward slashes for URLs, even if script runs on Windows
            rel_url = rel_path.replace('\\', '/')
            
            # Create a Markdown link with proper URL encoding for spaces and special characters
            indent = '  ' * indent_level
            lines.append(f"{indent}- [{display_name}]({quote(rel_url)})")

    return lines

def main():
    """
    Main execution block: Builds the _sidebar.md file.
    """
    # Defensive check: Ensure we are running from the root of the repository
    if not os.path.exists(DOCS_DIR):
        print(f"Error: Could not find '{DOCS_DIR}' directory. Please run this script from the repository root.")
        return

    # Start generating the content for the _sidebar.md file
    # We always explicitly add the Home link at the very top.
    sidebar_content = [
        f"- [Home]({quote(HOMEPAGE)})",
        "" # Empty line for spacing below the Home link
    ]
    
    # Run the recursive crawler to build the rest of the navigation
    sidebar_content.extend(generate_sidebar_content(DOCS_DIR, DOCS_DIR))

    # Write the assembled strings to the _sidebar.md file
    with open(SIDEBAR_FILE, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sidebar_content))
        
    print(f"Successfully generated {SIDEBAR_FILE}!")

if __name__ == "__main__":
    main()
