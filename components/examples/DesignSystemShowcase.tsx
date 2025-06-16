import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Search, Heart, Settings, Plus } from 'phosphor-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import design system components
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import Badge from '@/components/ui/Badge';
import IconButton from '@/components/ui/IconButton';

// Import design tokens
import { colors, spacing, borderRadius } from '@/constants/design-tokens';

export default function DesignSystemShowcase() {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleInputChange = (text: string) => {
    setInputValue(text);
    if (text.length < 3 && text.length > 0) {
      setInputError('Must be at least 3 characters');
    } else {
      setInputError('');
    }
  };

  return (
    <LinearGradient colors={['#f1eee6', '#faefea']} locations={[0.7, 1]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.section}>
            <Typography variant="h1" color="primary">
              Design System
            </Typography>
            <Typography variant="body1" color="600" style={{ marginTop: spacing[2] }}>
              A comprehensive showcase of our design system components
            </Typography>
          </View>

          {/* Typography Section */}
          <Card style={styles.section}>
            <Typography variant="h3" style={{ marginBottom: spacing[4] }}>
              Typography
            </Typography>
            
            <View style={styles.typographyGrid}>
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="h4">Heading 4</Typography>
              <Typography variant="h5">Heading 5</Typography>
              <Typography variant="h6">Heading 6</Typography>
              <Typography variant="body1">Body 1 - Regular text content</Typography>
              <Typography variant="body2">Body 2 - Smaller text content</Typography>
              <Typography variant="caption">Caption - Very small text</Typography>
              <Typography variant="overline">Overline Text</Typography>
            </View>
          </Card>

          {/* Colors Section */}
          <Card style={styles.section}>
            <Typography variant="h3" style={{ marginBottom: spacing[4] }}>
              Colors
            </Typography>
            
            <View style={styles.colorGrid}>
              <View style={styles.colorRow}>
                <Typography variant="h6" style={{ marginBottom: spacing[2] }}>Primary</Typography>
                <View style={styles.colorSwatches}>
                  <View style={[styles.colorSwatch, { backgroundColor: colors.primary.light }]} />
                  <View style={[styles.colorSwatch, { backgroundColor: colors.primary.DEFAULT }]} />
                  <View style={[styles.colorSwatch, { backgroundColor: colors.primary.dark }]} />
                </View>
              </View>
              
              <View style={styles.colorRow}>
                <Typography variant="h6" style={{ marginBottom: spacing[2] }}>Secondary</Typography>
                <View style={styles.colorSwatches}>
                  <View style={[styles.colorSwatch, { backgroundColor: colors.secondary.light }]} />
                  <View style={[styles.colorSwatch, { backgroundColor: colors.secondary.DEFAULT }]} />
                  <View style={[styles.colorSwatch, { backgroundColor: colors.secondary.dark }]} />
                </View>
              </View>
              
              <View style={styles.colorRow}>
                <Typography variant="h6" style={{ marginBottom: spacing[2] }}>Status Colors</Typography>
                <View style={styles.colorSwatches}>
                  <View style={[styles.colorSwatch, { backgroundColor: colors.success.DEFAULT }]} />
                  <View style={[styles.colorSwatch, { backgroundColor: colors.warning.DEFAULT }]} />
                  <View style={[styles.colorSwatch, { backgroundColor: colors.error.DEFAULT }]} />
                </View>
              </View>
            </View>
          </Card>

          {/* Buttons Section */}
          <Card style={styles.section}>
            <Typography variant="h3" style={{ marginBottom: spacing[4] }}>
              Buttons
            </Typography>
            
            <View style={styles.buttonGrid}>
              <Button title="Primary" onPress={() => {}} />
              <Button title="Secondary" variant="secondary" onPress={() => {}} />
              <Button title="Outline" variant="outline" onPress={() => {}} />
              <Button title="Ghost" variant="ghost" onPress={() => {}} />
              <Button title="Error" variant="error" onPress={() => {}} />
              <Button title="Success" variant="success" onPress={() => {}} />
            </View>
            
            <Typography variant="h6" style={{ marginTop: spacing[4], marginBottom: spacing[2] }}>
              Button Sizes
            </Typography>
            <View style={styles.buttonSizes}>
              <Button title="Small" size="sm" onPress={() => {}} />
              <Button title="Medium" size="md" onPress={() => {}} />
              <Button title="Large" size="lg" onPress={() => {}} />
            </View>
            
            <Typography variant="h6" style={{ marginTop: spacing[4], marginBottom: spacing[2] }}>
              Button States
            </Typography>
            <View style={styles.buttonStates}>
              <Button title="Normal" onPress={() => {}} />
              <Button title="Loading" loading onPress={() => {}} />
              <Button title="Disabled" disabled onPress={() => {}} />
            </View>
          </Card>

          {/* Icon Buttons Section */}
          <Card style={styles.section}>
            <Typography variant="h3" style={{ marginBottom: spacing[4] }}>
              Icon Buttons
            </Typography>
            
            <View style={styles.iconButtonGrid}>
              <IconButton onPress={() => {}}>
                <Heart size={20} color="#FFFFFF" />
              </IconButton>
              <IconButton variant="secondary" onPress={() => {}}>
                <Settings size={20} color="#FFFFFF" />
              </IconButton>
              <IconButton variant="outline" onPress={() => {}}>
                <Plus size={20} color={colors.primary.DEFAULT} />
              </IconButton>
              <IconButton variant="ghost" onPress={() => {}}>
                <Search size={20} color={colors.primary.DEFAULT} />
              </IconButton>
            </View>
          </Card>

          {/* Inputs Section */}
          <Card style={styles.section}>
            <Typography variant="h3" style={{ marginBottom: spacing[4] }}>
              Inputs
            </Typography>
            
            <View style={styles.inputGrid}>
              <Input
                label="Email"
                placeholder="Enter your email"
                value={inputValue}
                onChangeText={handleInputChange}
                error={inputError}
                leftIcon={<Search size={20} color={colors.neutral[400]} />}
              />
              
              <Input
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
                helperText="Must be at least 8 characters"
              />
              
              <Input
                label="Search"
                placeholder="Search..."
                leftIcon={<Search size={20} color={colors.neutral[400]} />}
                size="sm"
              />
            </View>
          </Card>

          {/* Badges Section */}
          <Card style={styles.section}>
            <Typography variant="h3" style={{ marginBottom: spacing[4] }}>
              Badges
            </Typography>
            
            <View style={styles.badgeGrid}>
              <Badge>Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </View>
            
            <Typography variant="h6" style={{ marginTop: spacing[4], marginBottom: spacing[2] }}>
              Badge Sizes
            </Typography>
            <View style={styles.badgeSizes}>
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </View>
          </Card>

          {/* Cards Section */}
          <Card style={styles.section}>
            <Typography variant="h3" style={{ marginBottom: spacing[4] }}>
              Cards
            </Typography>
            
            <View style={styles.cardGrid}>
              <Card variant="default" padding={3}>
                <Typography variant="h6">Default Card</Typography>
                <Typography variant="body2" color="600" style={{ marginTop: spacing[1] }}>
                  This is a default card with standard styling.
                </Typography>
              </Card>
              
              <Card variant="elevated" padding={3}>
                <Typography variant="h6">Elevated Card</Typography>
                <Typography variant="body2" color="600" style={{ marginTop: spacing[1] }}>
                  This card has enhanced shadow for emphasis.
                </Typography>
              </Card>
              
              <Card variant="outlined" padding={3}>
                <Typography variant="h6">Outlined Card</Typography>
                <Typography variant="body2" color="600" style={{ marginTop: spacing[1] }}>
                  This card uses a border instead of shadow.
                </Typography>
              </Card>
            </View>
          </Card>

          {/* Motion Guidelines */}
          <Card style={styles.section}>
            <Typography variant="h3" style={{ marginBottom: spacing[4] }}>
              Motion Guidelines
            </Typography>
            
            <Typography variant="body1" style={{ marginBottom: spacing[3] }}>
              Our design system includes standardized motion tokens:
            </Typography>
            
            <View style={styles.motionList}>
              <Typography variant="body2" color="600">• Fast: 150ms - Quick micro-interactions</Typography>
              <Typography variant="body2" color="600">• Medium: 300ms - Standard transitions</Typography>
              <Typography variant="body2" color="600">• Slow: 500ms - Complex animations</Typography>
            </View>
            
            <Typography variant="body1" style={{ marginTop: spacing[3], marginBottom: spacing[2] }}>
              Easing curves:
            </Typography>
            
            <View style={styles.motionList}>
              <Typography variant="body2" color="600">• Standard: General purpose easing</Typography>
              <Typography variant="body2" color="600">• Entrance: Elements entering the screen</Typography>
              <Typography variant="body2" color="600">• Exit: Elements leaving the screen</Typography>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    margin: spacing[4],
  },
  typographyGrid: {
    gap: spacing[3],
  },
  colorGrid: {
    gap: spacing[4],
  },
  colorRow: {
    gap: spacing[2],
  },
  colorSwatches: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  buttonSizes: {
    flexDirection: 'row',
    gap: spacing[2],
    alignItems: 'center',
  },
  buttonStates: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  iconButtonGrid: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  inputGrid: {
    gap: spacing[4],
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  badgeSizes: {
    flexDirection: 'row',
    gap: spacing[2],
    alignItems: 'center',
  },
  cardGrid: {
    gap: spacing[3],
  },
  motionList: {
    gap: spacing[1],
  },
});